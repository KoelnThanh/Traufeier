-- =====================================================================
--  Traufeier – Benachrichtigungen per Telegram
--
--  Nachtrag zu schema.sql, speisen.sql und erweiterung.sql. Einmal
--  komplett im Supabase SQL-Editor ausfuehren. Laesst sich gefahrlos
--  wiederholen.
--
--  Was passiert:
--   1. Jede Aenderung der Gaeste landet als Zeile in intern.meldungen.
--   2. Alle 15 Minuten schickt die Datenbank EINE Sammelnachricht an
--      eure Telegram-Gruppe – nur wenn sich etwas getan hat, und nicht
--      zwischen 22 und 8 Uhr. Was nachts passiert, kommt morgens.
--   3. Allergien stehen nie in der Nachricht, nur dass etwas ankam.
--      Telegram-Gruppen sind nicht Ende-zu-Ende-verschluesselt.
--
--  Bot-Token und Chat-ID stehen NICHT in dieser Datei – das Repo ist
--  oeffentlich. Sie kommen in den Vault von Supabase, siehe README
--  unter "Benachrichtigungen".
-- =====================================================================

create extension if not exists pg_net with schema extensions;
create extension if not exists pg_cron with schema pg_catalog;

-- Eigenes Schema: Die API gibt nur 'public' heraus. Was hier liegt, kann
-- niemand mit dem oeffentlichen Schluessel aufrufen – sonst koennte
-- jeder eure Gruppe mit Nachrichten fluten.
create schema if not exists intern;

create table if not exists intern.meldungen (
  id       bigint generated always as identity primary key,
  text     text not null,
  erfasst  timestamptz not null default now(),
  gesendet timestamptz,
  anfrage  bigint   -- id in net._http_response, fuer den zweiten Versuch
);

revoke all on all tables in schema intern from public, anon, authenticated;


-- =====================================================================
--  1) Aenderungen mitschreiben
--
--  Jede Trigger-Funktion faengt ihre eigenen Fehler ab: Klemmt die
--  Benachrichtigung, muss das Speichern der Gaeste trotzdem klappen.
-- =====================================================================

create or replace function intern.profil_gemerkt()
returns trigger
language plpgsql
security definer
set search_path = public, intern
as $$
begin
  begin
    if tg_op = 'INSERT' or new.zusage is distinct from old.zusage then
      if new.zusage is true then
        insert into intern.meldungen (text) values ('✅ ' || new.name || ' kommt');
      elsif new.zusage is false then
        insert into intern.meldungen (text) values ('❌ ' || new.name || ' kann leider nicht');
      elsif tg_op = 'UPDATE' then
        insert into intern.meldungen (text) values ('↩️ ' || new.name || ': Zusage wieder offen');
      end if;
    end if;

    if new.foto is not null and new.foto is distinct from old.foto then
      insert into intern.meldungen (text) values ('📷 ' || new.name || ' hat ein Foto hochgeladen');
    end if;

    if new.steckbrief is not null and new.steckbrief is distinct from old.steckbrief then
      insert into intern.meldungen (text) values (
        '✏️ ' || new.name || ': „'
        || case when length(new.steckbrief) > 120
                then left(new.steckbrief, 119) || '…'
                else new.steckbrief end
        || '“'
      );
    end if;
  exception when others then
    raise warning 'Traufeier-Meldung (profile): %', sqlerrm;
  end;
  return new;
end;
$$;

create or replace function intern.kueche_gemerkt()
returns trigger
language plpgsql
security definer
set search_path = public, intern
as $$
begin
  begin
    -- Bewusst ohne Inhalt: Gesundheitsangaben gehoeren nicht in Telegram.
    insert into intern.meldungen (text)
    values ('🍽️ ' || new.name || ' hat der Küche etwas mitgeteilt (steht in der Planung)');
  exception when others then
    raise warning 'Traufeier-Meldung (kueche): %', sqlerrm;
  end;
  return new;
end;
$$;

create or replace function intern.speise_gemerkt()
returns trigger
language plpgsql
security definer
set search_path = public, intern
as $$
begin
  begin
    if tg_op = 'INSERT' then
      insert into intern.meldungen (text)
      values ('🍲 ' || new.name || ' bringt ' || new.titel || coalesce(' (' || new.menge || ')', ''));
    elsif new.zurueckgezogen and not old.zurueckgezogen then
      insert into intern.meldungen (text)
      values ('↩️ ' || new.name || ' bringt doch nicht: ' || new.titel);
    elsif old.zurueckgezogen and not new.zurueckgezogen then
      insert into intern.meldungen (text)
      values ('🍲 ' || new.name || ' bringt doch: ' || new.titel);
    elsif (new.titel, new.menge, new.zutaten, new.art, new.allergene, new.kennzeichen)
          is distinct from
          (old.titel, old.menge, old.zutaten, old.art, old.allergene, old.kennzeichen) then
      insert into intern.meldungen (text)
      values ('✏️ ' || new.name || ' hat „' || new.titel || '“ geändert');
    end if;
  exception when others then
    raise warning 'Traufeier-Meldung (speisen): %', sqlerrm;
  end;
  return new;
end;
$$;

create or replace function intern.musik_gemerkt()
returns trigger
language plpgsql
security definer
set search_path = public, intern
as $$
begin
  begin
    if tg_op = 'INSERT' then
      insert into intern.meldungen (text)
      values ('🎵 ' || new.name || ' wünscht sich „' || new.titel || '“' || coalesce(' von ' || new.interpret, ''));
    elsif new.zurueckgezogen and not old.zurueckgezogen then
      insert into intern.meldungen (text)
      values ('↩️ ' || new.name || ' nimmt „' || new.titel || '“ zurück');
    end if;
  exception when others then
    raise warning 'Traufeier-Meldung (musik): %', sqlerrm;
  end;
  return new;
end;
$$;

drop trigger if exists meldung on profile;
drop trigger if exists meldung on kueche;
drop trigger if exists meldung on speisen;
drop trigger if exists meldung on musik;

create trigger meldung after insert or update on profile
  for each row execute function intern.profil_gemerkt();
create trigger meldung after insert on kueche
  for each row execute function intern.kueche_gemerkt();
create trigger meldung after insert or update on speisen
  for each row execute function intern.speise_gemerkt();
create trigger meldung after insert or update on musik
  for each row execute function intern.musik_gemerkt();


-- =====================================================================
--  2) Senden
-- =====================================================================

-- Eine Nachricht an eure Gruppe. Gibt die Anfrage-Nummer zurueck, oder
-- null, wenn Token oder Chat-ID im Vault fehlen.
create or replace function intern.telegram(nachricht text)
returns bigint
language plpgsql
security definer
set search_path = public, intern
as $$
declare
  -- Leerzeichen und Zeilenumbrueche raus: Beim Einfuegen in den Vault
  -- rutschen sie leicht mit hinein, und dann ist die URL ungueltig.
  token text := (select regexp_replace(decrypted_secret, '\s', '', 'g')
                   from vault.decrypted_secrets
                  where name = 'traufeier_telegram_token');
  chat  text := (select regexp_replace(decrypted_secret, '\s', '', 'g')
                   from vault.decrypted_secrets
                  where name = 'traufeier_telegram_chat');
begin
  if token is null or chat is null then
    raise notice 'Bot-Token oder Chat-ID fehlt im Vault – siehe README.';
    return null;
  end if;
  return net.http_post(
    url     := 'https://api.telegram.org/bot' || token || '/sendMessage',
    body    := jsonb_build_object(
                 'chat_id', chat,
                 'text', left(nachricht, 4000),
                 'disable_web_page_preview', true),
    headers := '{"Content-Type": "application/json"}'::jsonb
  );
end;
$$;

-- Alle 15 Minuten: offene Meldungen als eine Nachricht, doppelte Zeilen
-- zusammengefasst, darunter der Stand der Zusagen.
create or replace function intern.sammeln(nachtruhe boolean default true)
returns void
language plpgsql
security definer
set search_path = public, intern
as $$
declare
  stunde     int := extract(hour from now() at time zone 'Europe/Berlin');
  ids        bigint[];
  liste      text;
  anzahl     int;
  stand      text;
  anfrage_id bigint;
begin
  -- Was beim letzten Mal nicht ankam, geht noch einmal mit.
  update intern.meldungen m
     set gesendet = null, anfrage = null
    from net._http_response r
   where r.id = m.anfrage
     and r.status_code is distinct from 200
     and m.erfasst > now() - interval '1 day';

  if nachtruhe and (stunde >= 22 or stunde < 8) then
    return;
  end if;

  with offen as (
    select id, text from intern.meldungen
     where gesendet is null
     order by id
     limit 80
  ), gruppiert as (
    select text, min(id) as zuerst from offen group by text
  )
  select (select array_agg(id) from offen),
         (select string_agg(text, E'\n' order by zuerst) from gruppiert),
         (select count(*) from gruppiert)
    into ids, liste, anzahl;

  if ids is null then
    return;
  end if;

  select format('Stand: %s kommen · %s können nicht · %s offen',
                count(*) filter (where p.zusage is true),
                count(*) filter (where p.zusage is false),
                count(*) filter (where p.zusage is null))
    into stand
    from gaeste g
    left join profile p on p.name = g.name;

  anfrage_id := intern.telegram(
    'Traufeier · ' || anzahl
    || case when anzahl = 1 then ' Neuigkeit' else ' Neuigkeiten' end
    || E'\n\n' || liste || E'\n\n' || stand
  );
  if anfrage_id is null then
    return; -- noch kein Token: die Meldungen bleiben liegen
  end if;

  update intern.meldungen
     set gesendet = now(), anfrage = anfrage_id
   where id = any(ids);
end;
$$;

revoke all on function intern.telegram(text) from public, anon, authenticated;
revoke all on function intern.sammeln(boolean) from public, anon, authenticated;


-- =====================================================================
--  3) Zeitplan
--  Stoppen:  select cron.unschedule('traufeier-telegram');
-- =====================================================================
select cron.schedule('traufeier-telegram', '*/15 * * * *', $$select intern.sammeln()$$);


-- Kontrolle: sollte die vier Trigger und den Zeitplan zeigen
select event_object_table as tabelle, trigger_name
  from information_schema.triggers
 where trigger_name = 'meldung'
 group by 1, 2;
select jobname, schedule, active from cron.job where jobname = 'traufeier-telegram';
