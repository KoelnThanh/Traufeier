-- =====================================================================
--  Traufeier – Nachtrag Oktober 2026
--
--  "Was trinkst du?": neue Spalte im Profil. Bis sie existiert,
--  blendet die Seite die Karte einfach aus.
--
--  Im Supabase SQL-Editor ausfuehren. Mehrfaches Ausfuehren schadet nicht.
-- =====================================================================

-- ------------------------------------------------------------ Getraenke
-- Werte wie in feier.js (GETRAENKE), deutsch. Mehrere erlaubt.
alter table profile add column if not exists getraenke text[];

-- Die Policies aus schema.sql erlauben insert/update auf profile schon
-- fuer alle Spalten – hier ist nichts weiter zu tun.

-- Wer trinkt was – fuer den Einkauf. Nur Zusagen und Unentschiedene.
create or replace view getraenke_stand as
select g.getraenk,
       count(*) as personen,
       string_agg(p.name, ', ' order by p.name) as wer
  from profile p
  cross join lateral unnest(p.getraenke) as g(getraenk)
 where p.zusage is distinct from false
 group by 1
 order by 2 desc;
