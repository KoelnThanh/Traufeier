-- =====================================================================
--  Traufeier – Foto-Speicher
--  ERST NACH schema.sql ausfuehren, und bewusst als eigenes Skript:
--  der SQL-Editor faehrt jedes Skript als eine Transaktion, und der
--  Policy-Teil unten scheitert in manchen Projekten an fehlenden
--  Rechten ("must be owner of table objects"). Dann bleiben wenigstens
--  die Tabellen aus schema.sql erhalten.
-- =====================================================================

-- ---------------------------------------------------------------------
--  Teil 1: Bucket – laeuft immer
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'gaeste-fotos', 'gaeste-fotos', true, 10485760,
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do update set
  public             = true,
  file_size_limit    = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- ---------------------------------------------------------------------
--  Teil 2: Upload-Policy
--  "Public bucket" heisst nur oeffentlich LESEN. Ohne diese Policy
--  scheitert jeder Upload mit "new row violates row-level security".
--  Bewusst nur insert – kein update, kein delete: so kann niemand die
--  Fotos anderer ueberschreiben oder loeschen.
-- ---------------------------------------------------------------------
drop policy if exists gaeste_foto_upload on storage.objects;

create policy gaeste_foto_upload on storage.objects
  for insert to anon
  with check (bucket_id = 'gaeste-fotos');

-- ---------------------------------------------------------------------
--  Falls Teil 2 mit einem Rechtefehler abbricht:
--  Dashboard -> Storage -> gaeste-fotos -> Policies -> New policy
--    Policy name : gaeste_foto_upload
--    Allowed op  : INSERT
--    Target roles: anon
--    WITH CHECK  : bucket_id = 'gaeste-fotos'
--  Teil 1 ist dann bereits erledigt und muss nicht wiederholt werden.
-- ---------------------------------------------------------------------

-- Kontrolle: sollte eine Zeile liefern
select id, public, file_size_limit from storage.buckets where id = 'gaeste-fotos';
