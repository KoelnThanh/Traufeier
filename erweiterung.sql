-- =====================================================================
--  Traufeier – Erweiterung: persoenliche Links, Musikwuensche, Planung
--
--  Nachtrag zu schema.sql und speisen.sql. Einmal komplett im Supabase
--  SQL-Editor ausfuehren. Laesst sich gefahrlos wiederholen.
--
--  VORHER: ganz unten in Teil 3 eure beiden E-Mail-Adressen eintragen.
--  Diese Datei danach NICHT mit euren Adressen committen – das Repo
--  ist oeffentlich.
-- =====================================================================


-- =====================================================================
--  1) Persoenliche Links und Sprache je Haushalt
--
--  Jeder Haushalt bekommt einen kurzen Code. Wer den Link
--  traufeier.nthanh.de/?h=CODE oeffnet, landet direkt bei sich – ohne
--  sich in einer Liste mit 44 Namen suchen zu muessen.
--
--  Ehrlich gesagt: Das ist Bequemlichkeit, kein Schutz. Der Code ist mit
--  dem oeffentlichen Schluessel lesbar, und jeder kann auf der Seite
--  weiterhin jeden Gast auswaehlen. Er verhindert nur, dass jemand
--  versehentlich in einem fremden Haushalt landet.
-- =====================================================================
alter table gaeste add column if not exists link    text;
alter table gaeste add column if not exists sprache text;  -- 'de' | 'en' | 'es' | 'vi'

-- Wer neu in einen Haushalt kommt, der schon einen Code hat, bekommt
-- denselben – ein Haushalt, ein Link.
update gaeste g
   set link = x.link
  from (select coalesce(familie, name) as haus, min(link) as link
          from gaeste
         where link is not null
         group by 1) x
 where g.link is null
   and coalesce(g.familie, g.name) = x.haus;

-- Haushalte ganz ohne Code bekommen einen neuen. MATERIALIZED sorgt
-- dafuer, dass random() einmal je Haushalt laeuft, nicht je Person.
with neu as materialized (
  select haus,
         substr(md5(random()::text || clock_timestamp()::text || haus), 1, 10) as link
    from (select distinct coalesce(familie, name) as haus
            from gaeste
           where link is null) h
)
update gaeste g
   set link = neu.link
  from neu
 where g.link is null
   and coalesce(g.familie, g.name) = neu.haus;

create index if not exists gaeste_link on gaeste (link);

-- Achtung: import.sql leert die Gaesteliste. Danach diese Datei noch
-- einmal ausfuehren – die Links sind dann neu und muessen neu raus.


-- =====================================================================
--  2) Musikwuensche
-- =====================================================================
create table if not exists musik (
  id             bigint generated always as identity primary key,
  name           text not null
                 references gaeste(name) on update cascade on delete cascade,
  titel          text not null,
  interpret      text,
  -- Wie bei den Speisen: zuruecknehmen statt loeschen.
  zurueckgezogen boolean not null default false,
  angelegt       timestamptz not null default now()
);

alter table musik enable row level security;

drop policy if exists musik_lesen   on musik;
drop policy if exists musik_anlegen on musik;
drop policy if exists musik_aendern on musik;

create policy musik_lesen   on musik for select to anon using (true);
create policy musik_anlegen on musik for insert to anon with check (true);
create policy musik_aendern on musik for update to anon
  using (true) with check (true);

grant select, insert, update on musik to anon;


-- =====================================================================
--  3) Planung: Zugang nur fuer euch zwei
--
--  planung.html zeigt das meiste mit dem oeffentlichen Schluessel. Die
--  Kuechenangaben (Allergien) aber gibt die Datenbank nur heraus, wenn
--  jemand angemeldet ist UND in der Tabelle 'planer' steht.
--
--  So richtet ihr das ein:
--   a) Supabase -> Authentication -> Users -> Add user -> Create new user
--      E-Mail + Passwort, "Auto Confirm User" anhaken. Fuer euch beide.
--   b) Supabase -> Authentication -> Sign In / Providers:
--      "Allow new users to sign up" AUS. Sonst kann sich jeder ein
--      Konto anlegen (er saehe trotzdem nichts, aber es muss nicht sein).
--   c) Unten eure beiden Adressen eintragen und diese Datei ausfuehren.
-- =====================================================================
create table if not exists planer (
  email text primary key
);

-- Keine Policy: Ueber die API liest niemand diese Tabelle. Nur die
-- Funktion darunter schaut hinein.
alter table planer enable row level security;
revoke all on planer from anon, authenticated;

-- Ist die angemeldete Person eine von euch? 'security definer' laesst
-- die Funktion in 'planer' nachsehen, ohne dass die Tabelle selbst
-- freigegeben werden muss.
create or replace function ist_planer()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from planer
     where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function ist_planer() from public;
grant execute on function ist_planer() to authenticated;

-- Lesen fuer euch: alles, auch die Kueche.
drop policy if exists planer_liest_gaeste  on gaeste;
drop policy if exists planer_liest_profile on profile;
drop policy if exists planer_liest_kueche  on kueche;
drop policy if exists planer_liest_speisen on speisen;
drop policy if exists planer_liest_musik   on musik;

create policy planer_liest_gaeste  on gaeste  for select to authenticated using (ist_planer());
create policy planer_liest_profile on profile for select to authenticated using (ist_planer());
create policy planer_liest_kueche  on kueche  for select to authenticated using (ist_planer());
create policy planer_liest_speisen on speisen for select to authenticated using (ist_planer());
create policy planer_liest_musik   on musik   for select to authenticated using (ist_planer());

-- Schreiben fuer euch: nur die Sprache eines Haushalts. Die Rechte
-- gelten fuer genau diese eine Spalte, nicht fuer die ganze Zeile.
drop policy if exists planer_setzt_sprache on gaeste;
create policy planer_setzt_sprache on gaeste for update to authenticated
  using (ist_planer()) with check (ist_planer());

grant usage on schema public to authenticated;
grant select on gaeste, profile, kueche, speisen, musik to authenticated;
grant update (sprache) on gaeste to authenticated;

-- Eure Adressen – dieselben wie unter Authentication -> Users.
-- Die zwei Zeilen anpassen, dann ausfuehren.
insert into planer (email) values
  ('ERSTE-ADRESSE@example.com'),
  ('ZWEITE-ADRESSE@example.com')
on conflict do nothing;


-- =====================================================================
--  Eure Auswertungen
-- =====================================================================

-- Wer hat noch nicht geantwortet – mit Link zum Nachhaken
create or replace view noch_offen as
select coalesce(g.familie, g.name) as haushalt,
       string_agg(g.name, ', ' order by g.name) as wer,
       min(g.link) as link
  from gaeste g
  left join profile p on p.name = g.name
 where p.zusage is null
 group by 1
 order by 1;

-- Alle Musikwuensche fuer den DJ
create or replace view playlist as
select titel, interpret, name as gewuenscht_von, angelegt
  from musik
 where not zurueckgezogen
 order by angelegt;
