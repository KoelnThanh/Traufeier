-- =====================================================================
--  Traufeier – Mitbring-Buffet
--
--  Nachtrag zu schema.sql. Einmal im Supabase SQL-Editor ausfuehren.
--  Aendert nichts an den bestehenden Tabellen.
--
--  Warum eine eigene Tabelle und nicht ein Feld an 'profile':
--  Ein Gast bringt Salat UND Getraenke mit. Mehrere Zeilen pro Person
--  gehen nur so.
-- =====================================================================

create table if not exists speisen (
  id             bigint generated always as identity primary key,
  name           text not null
                 references gaeste(name) on update cascade on delete cascade,

  bereich        text not null,   -- 'Mittagsbuffet' | 'Anderes'
  art            text,            -- 'herzhaft', 'Salat oder Beilage', …
                                  -- bei 'Anderes' Freitext des Gastes
  titel          text not null,   -- 'Kartoffelsalat'
  menge          text,            -- 'für ca. 10'
  zutaten        text,            -- Freitext, fuer alles was kein Haken abdeckt

  -- Ankreuzbar beim Eintragen, damit sich die Liste filtern laesst.
  allergene      text[] not null default '{}',   -- {'Ei','Senf'}
  kennzeichen    text[] not null default '{}',   -- {'vegetarisch'}

  -- Statt loeschen: zuruecknehmen. Ohne Login kann jeder alles
  -- anfassen; ein Fehlklick soll keine drei Wochen Planung kosten.
  -- Ihr seht die zurueckgezogenen Zeilen weiter im Table Editor.
  zurueckgezogen boolean not null default false,

  angelegt       timestamptz not null default now(),
  geaendert      timestamptz not null default now()
);

create index if not exists speisen_nach_gast on speisen (name);

-- ---------------------------------------------------------------------
--  Zugriff
--
--  Anders als 'kueche' darf hier gelesen werden: was in einem Salat
--  steckt, ist eine Rezeptangabe. Wer eine Allergie hat, muss das
--  sehen koennen – genau dafuer ist die Liste da.
--
--  Kein delete: Zuruecknehmen laeuft ueber das update-Flag oben.
-- ---------------------------------------------------------------------
alter table speisen enable row level security;

drop policy if exists speisen_lesen   on speisen;
drop policy if exists speisen_anlegen on speisen;
drop policy if exists speisen_aendern on speisen;

create policy speisen_lesen   on speisen for select to anon using (true);
create policy speisen_anlegen on speisen for insert to anon with check (true);
create policy speisen_aendern on speisen for update to anon
  using (true) with check (true);

grant select, insert, update on speisen to anon;

-- =====================================================================
--  Eure Auswertungen
-- =====================================================================

-- Das Buffet, so wie es am Tag auf dem Tisch steht
create or replace view buffet as
select
  s.bereich,
  coalesce(s.art, '–') as art,
  s.titel,
  s.name as bringt_mit,
  s.menge,
  s.zutaten,
  s.allergene,
  s.kennzeichen,
  s.geaendert
from speisen s
where not s.zurueckgezogen
order by s.bereich, s.art nulls last, s.titel;

-- Was in welcher Kategorie zusammenkommt
create or replace view buffet_stand as
select bereich,
       coalesce(art, '–') as art,
       count(*) as beitraege,
       string_agg(titel, ', ' order by titel) as was
from speisen
where not zurueckgezogen
group by 1, 2
order by 1, 2;

-- Alle Allergene, die am Buffet vorkommen – Gegenprobe zur
-- Tabelle 'kueche', die ihr im Table Editor lest.
create or replace view buffet_allergene as
select unnest(allergene) as allergen,
       count(*) as gerichte,
       string_agg(titel, ', ') as wo_drin
from speisen
where not zurueckgezogen
group by 1
order by 2 desc;
