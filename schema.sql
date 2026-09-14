-- =====================================================================
--  Traufeier – Datenbankschema
--  Einmal komplett in den Supabase SQL-Editor einfügen und ausführen.
--  Legt Tabellen, Zugriffsregeln UND den Foto-Bucket an.
--
--  Spalten folgen eurer Gästeliste, Schlüssel ist überall der Name.
-- =====================================================================

-- ---------------------------------------------------------------------
--  1) Stammdaten – pflegt ihr, Gäste lesen nur
-- ---------------------------------------------------------------------
create table if not exists gaeste (
  name           text primary key,
  familie        text,           -- Haushalt, z. B. 'Nahel & Svijetlana'
  art            text,           -- 'Erwachsen' | 'Kind' | 'Bedienste'
  zugehoerigkeit text,           -- 'Christina' | 'Thanh' | 'Bedienste'
  standesamt     text,           -- 'Ja' | 'Nein' | '(Ja)'
  schlafplatz    boolean not null default false,
  schlafort      text,           -- 'Hotel', 'Airbnb', '??' … null = keiner
  rollen         text[] not null default '{}'
);

-- ---------------------------------------------------------------------
--  2) Öffentliches Profil – pflegen die Gäste selbst
-- ---------------------------------------------------------------------
create table if not exists profile (
  name       text primary key
             references gaeste(name) on update cascade on delete cascade,
  foto       text,
  steckbrief text,
  zusage     boolean,
  geaendert  timestamptz not null default now()
);

-- ---------------------------------------------------------------------
--  3) Küche – nur hineinwerfen, niemals auslesen
--     Allergien sind Gesundheitsdaten. Ohne echten Login kann die App
--     "dieser Gast" nicht von "irgendein Gast" unterscheiden, deshalb
--     darf anon diese Tabelle nur beschreiben. Ihr lest sie im Dashboard.
-- ---------------------------------------------------------------------
create table if not exists kueche (
  id        bigint generated always as identity primary key,
  name      text not null
            references gaeste(name) on update cascade on delete cascade,
  allergien text,
  hinweise  text,
  erfasst   timestamptz not null default now()
);

-- =====================================================================
--  Zugriffsregeln
-- =====================================================================
alter table gaeste  enable row level security;
alter table profile enable row level security;
alter table kueche  enable row level security;

drop policy if exists stammdaten_lesen on gaeste;
drop policy if exists profil_lesen     on profile;
drop policy if exists profil_anlegen   on profile;
drop policy if exists profil_aendern   on profile;
drop policy if exists kueche_einwerfen on kueche;

-- Stammdaten: lesen ja, ändern nein
create policy stammdaten_lesen on gaeste
  for select to anon using (true);

-- Profile: lesen und pflegen
create policy profil_lesen on profile
  for select to anon using (true);
create policy profil_anlegen on profile
  for insert to anon with check (true);
create policy profil_aendern on profile
  for update to anon using (true) with check (true);

-- Küche: ausschliesslich insert – kein select, kein update, kein delete
create policy kueche_einwerfen on kueche
  for insert to anon with check (true);

-- =====================================================================
--  Tabellenrechte – die zweite Ebene, die man leicht vergisst
--
--  Postgres prueft ZUERST das Tabellenrecht (GRANT) und DANN die
--  Zeilen-Policy (RLS). Ohne GRANT scheitert jede Abfrage mit
--  "permission denied for table", egal wie gut die Policies sind.
--  Neuere Supabase-Projekte vergeben diese Rechte nicht mehr von selbst.
-- =====================================================================
grant usage on schema public to anon;

grant select                 on gaeste  to anon;
grant select, insert, update on profile to anon;
grant insert                 on kueche  to anon;

-- kueche bekommt bewusst KEIN select: zusammen mit der fehlenden
-- Select-Policy ist das die zweite Sperre vor den Allergiedaten.

-- Die Views unten bleiben ohne GRANT – sie sind fuer euer Dashboard,
-- nicht fuer die App. Was nicht gebraucht wird, wird nicht freigegeben.

-- =====================================================================
--  Fotos: siehe storage.sql – bewusst getrennt.
--  Der SQL-Editor faehrt ein Skript als EINE Transaktion. Scheitert der
--  Storage-Teil an fehlenden Rechten, wuerden sonst auch die Tabellen
--  oben wieder verschwinden.
-- =====================================================================

-- =====================================================================
--  Eure Auswertungen
-- =====================================================================

-- Alles auf einen Blick
create or replace view uebersicht as
select
  g.name, g.familie, g.art, g.zugehoerigkeit, g.standesamt,
  g.schlafplatz, g.schlafort, g.rollen,
  p.zusage, p.steckbrief,
  (p.foto is not null) as hat_foto,
  p.geaendert
from gaeste g
left join profile p on p.name = g.name
order by g.zugehoerigkeit, g.familie, g.name;

-- Standesamt: 'Ja' und '(Ja)' getrennt gezaehlt, Limit ist 25
create or replace view standesamt_stand as
select
  count(*) filter (where standesamt = 'Ja')   as fest,
  count(*) filter (where standesamt = '(Ja)') as unsicher,
  count(*) filter (where standesamt in ('Ja','(Ja)')) as gesamt,
  25 - count(*) filter (where standesamt in ('Ja','(Ja)')) as frei
from gaeste;

-- Wer braucht wo einen Schlafplatz
create or replace view schlafplaetze as
select coalesce(schlafort, 'noch offen') as ort,
       count(*) as personen,
       string_agg(name, ', ' order by name) as wer
from gaeste
where schlafplatz
group by 1
order by 2 desc;
