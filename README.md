# Traufeier

Einladung und Gäste-Board für die **Traufeier** von Christina und Thanh am
Samstag, 12. Dezember 2026 – standesamtlich im kleinen Kreis, danach ein
langer Tag in der Tanzschule. Die große Hochzeit kommt später; die Seite
sagt das auf der ersten Ansicht.

Kein Build-Schritt, kein npm. Läuft auf **Netlify** (Hosting) und
**Supabase** (Daten und Fotos).

| | |
|---|---|
| Einladung | https://traufeier.nthanh.de |
| Planung (für euch zwei) | https://traufeier.nthanh.de/planung.html |
| Repo | github.com/KoelnThanh/Traufeier – jeder Push auf `main` geht live |

---

## Dateien

| Datei | Inhalt |
|---|---|
| `feier.js` | **Eure Angaben**: Datum, Zeiten, Frist, Orte, Ablauf, Kategorien, Supabase-Schlüssel |
| `sprachen.js` | **Alle Texte** in Deutsch, Englisch, Spanisch, Vietnamesisch |
| `index.html` | Die Einladung – liest aus den beiden Dateien oben |
| `planung.html` | Euer Planungsblick: Antworten, Allergie-Abgleich, Versand, Export |
| `schema.sql` | Grundtabellen: `gaeste`, `profile`, `kueche` |
| `storage.sql` | Foto-Bucket |
| `speisen.sql` | Mitbring-Buffet |
| `erweiterung.sql` | Persönliche Links, Musikwünsche, Planer-Zugang |
| `vorschau.jpg`, `favicon.*`, `apple-touch-icon.png` | Link-Vorschau und Icons |

Eine Uhrzeit ändern → `feier.js`. Einen Text ändern → `sprachen.js`, in
allen vier Sprachen.

---

## Einrichtung – in dieser Reihenfolge

Alle Schritte sind erledigt – die Anleitung bleibt für den Fall, dass ihr neu aufsetzt.

### 1. Datenbank

Supabase → **SQL Editor**, nacheinander ausführen: `schema.sql`,
`storage.sql`, `speisen.sql`.

| Tabelle | Wer schreibt | Wer liest |
|---|---|---|
| `gaeste` | ihr, im Table Editor | alle |
| `profile` | die Gäste | alle |
| `kueche` | die Gäste | **nur ihr** |
| `speisen` | die Gäste | alle |

Allergien liegen bewusst getrennt: Der öffentliche Schlüssel darf `kueche`
nur beschreiben, nie auslesen. Schlüssel ist überall der **Name** –
`on update cascade` lässt Tippfehler-Korrekturen durchschlagen, Namen
müssen deshalb eindeutig sein.

Views zum Draufschauen: `uebersicht`, `standesamt_stand`, `schlafplaetze`,
`buffet`, `buffet_stand`, `buffet_allergene`.

### 2. Gästeliste importieren

`import.sql` im SQL-Editor ausführen (44 Gäste, erzeugt aus
`Eheschließung - Gästeliste.csv`).

**Achtung:** Das Skript beginnt mit `truncate gaeste cascade` und löscht
damit auch Profile, Küchenangaben, Buffet und persönliche Links. Sobald
Gäste etwas eingetragen haben, nicht mehr neu importieren – einzelne Zeilen
im Table Editor pflegen.

### 3. Veröffentlichen

Repo ist mit Netlify verbunden (Projekt `trfeierct`). Build command leer,
Publish directory `.` – steht in `netlify.toml`.

Netlify-Projekte starten **privat** (HTTP 401 für alle). Nach dem ersten
Deploy **Make public** klicken, sonst kommt kein Gast rein.

### 4. Eigene Adresse

Netlify → Domain management → Add a domain → `traufeier.nthanh.de`.
Bei INWX (Nameserver → `nthanh.de`):

| Typ | Name | Wert | TTL |
|---|---|---|---|
| CNAME | `traufeier` | `trfeierct.netlify.app` | 300 |

Das Let's-Encrypt-Zertifikat stellt Netlify selbst aus. Kommt „We could
not provision a certificate", war die Domain beim ersten Versuch noch nicht
zugeordnet → **Verify DNS configuration** klicken.

> Das Zertifikat läuft am 13.12.2026 ab, einen Tag nach der Feier.
> Netlify erneuert es rund 30 Tage vorher selbst. Mitte November kurz
> nachsehen, ob das geklappt hat.

### 5. Wachhalter

Supabase legt kostenlose Projekte nach **7 Tagen ohne Anfrage** schlafen.
`.github/workflows/keepalive.yml` pingt montags und donnerstags sowie bei
jedem Push. Er braucht keine Secrets – URL und publishable Key sind ohnehin
öffentlich. Ob er läuft: GitHub → Actions.

> GitHub deaktiviert geplante Workflows nach 60 Tagen ohne Aktivität im
> Repo. Sobald die Einladung verschickt ist, halten auch die Besuche der
> Gäste Supabase wach.

### 6. Erweiterung und euer Zugang

1. **Supabase → Authentication → Users → Add user → Create new user**:
   E-Mail und Passwort, „Auto Confirm User" anhaken. Für euch beide.
2. **Authentication → Sign In / Providers**: „Allow new users to sign up"
   **aus**.
3. In `erweiterung.sql` ganz unten eure beiden Adressen eintragen, im
   SQL-Editor ausführen. **Die Datei danach nicht mit euren Adressen
   committen** – das Repo ist öffentlich.
4. `planung.html` öffnen, anmelden. Die Küchenangaben erscheinen.

Bis dahin läuft alles weiter; Musikwünsche und persönliche Links bleiben
nur unsichtbar, und `planung.html` zeigt einen Hinweis.

### Lokal testen

```bash
python -m http.server 8000
```

Dann `http://localhost:8000` – **nicht** per Doppelklick. Bei `file://`
blockiert der Browser die Modul-Importe, und der Fehler sieht aus wie ein
Datenbankproblem.

Mit `?jetzt=2026-12-12T14:10` tut die Seite so, als wäre es gerade dann –
zum Ansehen der Tagesansicht und der Danke-Seite.

---

## Einladungen verschicken

Alles in `planung.html` unter **Einladungen verschicken**:

1. Pro Haushalt die **Sprache** wählen. Angemeldet wird sie gespeichert,
   und der persönliche Link öffnet die Seite dann in dieser Sprache.
2. Den Text prüfen – er lässt sich direkt im Feld anpassen.
3. **Text kopieren** oder **In WhatsApp öffnen**, Kontakt wählen, senden.
4. Für alle ohne Smartphone: **Karte drucken** (A6 quer, mit QR-Code zum
   persönlichen Link).

Die Vorlagen stehen oben im Script von `planung.html` (`VORLAGEN`).

**Vorher testen:** den eigenen Link an sich selbst schicken und prüfen, ob
WhatsApp die Vorschau mit Bild zeigt. Dann an zwei, drei Menschen, bevor
alle ihn bekommen – jemand Älteres aus der vietnamesischen Familie,
jemand Spanischsprachiges, jemand, der sich mit Handys schwertut.

### Persönliche Links

`erweiterung.sql` gibt jedem Haushalt einen Code: `?h=3f9c1a7b2e`. Wer den
Link öffnet, landet direkt im eigenen Haushalt und sieht zuerst die
Einladung. Der Code verschwindet danach aus der Adresszeile.

**Das ist Bequemlichkeit, kein Schutz.** Der Code ist mit dem öffentlichen
Schlüssel lesbar, und auf der Seite kann weiterhin jeder jeden Gast
auswählen. Er verhindert, dass jemand versehentlich woanders landet – nicht,
dass jemand es absichtlich tut. Bei 44 Menschen, die sich kennen, ist das
vertretbar.

Nach einem neuen `import.sql` sind die Codes weg: `erweiterung.sql` noch
einmal ausführen, und die Links müssen neu raus.

### Link-Vorschau

WhatsApp, Signal und Telegram zeigen Bild, „Christina & Thanh · 12.12.2026"
und „Einladung · Invitation · Invitación · Thiệp mời". Sprachneutral, weil
die Vorschau kein JavaScript ausführt und nicht weiß, wer den Link bekommt.

`robots.txt` lässt die Vorschau-Abrufer durch und sperrt Suchmaschinen.
Netlify sendet zusätzlich `X-Robots-Tag: noindex`. WhatsApp merkt sich
Vorschauen eine Weile – nach einer Änderung am Bild dauert es, bis sie
auftaucht.

---

## Aufbau der Einladung

Fünf Ansichten unter einem festen Kopf, in vier Sprachen:

| Ansicht | Zeigt |
|---|---|
| Einladung | Ablauf, Wie wir feiern, beide Orte mit Karte – für Unbekannte die Namensauswahl |
| Mein Platz | Haushalt, eigene Angaben, Checkliste, Zusage, Steckbrief, Foto, Buffet-Beiträge, Musikwünsche, Küche |
| Speisen | das Mittagsbuffet: wer bringt was, mit Zutaten und Allergenen |
| Gäste | alle Gäste, filterbar; ein Tipp zeigt den Steckbrief |
| Helfer | wer welche Aufgabe übernommen hat |

Der Kopf ist beim ersten Besuch eine Einladungskarte mit Countdown. Sobald
klar ist, wer da ist, schrumpft er auf eine Zeile.

### Wer gerade antwortet

Unter der Navigation steht immer „Du antwortest als …" mit Wechsel-Link.
In „Mein Platz" steht der Haushalt ganz oben – Eltern beantworten so in
einem Klick die Zusage ihrer Kinder. Beim Wechsel werden die Küchenfelder
geleert, sonst landen Annas Allergien bei Bruno.

### Frist, Tag der Feier, danach

- **Antwortfrist** (`FEIER.antwortBis`) steht bei der Namensauswahl und bei
  „Kommst du?", in der Sprache des Gastes formatiert. Danach bittet die
  Seite nur noch, Änderungen trotzdem zu melden.
- **Am Tag selbst** markiert der Ablauf, was gerade dran ist.
- **Nach der Feier** steht „Danke, dass ihr da wart" statt Countdown. Steht
  in `FEIER.fotos` der Link zur Galerie eurer Fotografin, erscheint ein
  Knopf dorthin.

### Kalender

„In meinen Kalender eintragen" baut die `.ics` im Browser, in der gewählten
Sprache. Wer beim Standesamt dabei ist, bekommt zwei Termine, alle anderen
nur die Feier. Die Zeitzone steht als vollständiger `VTIMEZONE`-Block drin,
Zeilen werden nach Bytes gefaltet – ein vietnamesisches Zeichen ist bis zu
drei Bytes lang.

### Mitbring-Buffet

Mittags bringen alle mit, abends wird gekocht – der Abendblock hat bewusst
kein Eingabefeld. Ein Gast darf mehrere Beiträge haben.

- **Kategorien** in `feier.js`. `art: null` heißt „der Gast schreibt selbst
  hin, was es ist".
- **Allergene sind Häkchen**, sonst ließe sich nicht filtern. Das
  Zutatenfeld bleibt zusätzlich.
- **Zutaten sind nicht dasselbe wie Allergien.** Was im Salat steckt, steht
  offen da. Was ein Mensch nicht verträgt, liegt in `kueche`.
- **Zurücknehmen statt löschen.** Die Zeile bleibt in der Tabelle; ein
  Fehlklick soll keine Planung kosten.
- Die **Lückenanzeige** nennt nur Kategorien, in denen gar nichts steht.
  Keine Zielzahlen.

### Musikwünsche

In „Mein Platz": Lied und Interpret, alle sehen alle Wünsche, eigene lassen
sich zurücknehmen. Für den DJ in `planung.html` als Liste zum Kopieren und
als View `playlist`.

### Sprachen

DE · EN · ES · VI oben rechts, auch vor der Anmeldung. Erste Wahl ist die
Sprache des Browsers – oder die, die ihr für den Haushalt festgelegt habt –,
danach die zuletzt gewählte.

- **Datenbankwerte bleiben deutsch.** Wer auf Spanisch „huevo" anhakt,
  speichert `Ei`. In `sprachen.js` steht bei `art`, `allergen` und
  `kennzeichen` links der Datenbankwert – nur rechts übersetzen.
- **Was Gäste schreiben, bleibt, wie sie es schreiben** – auch Rollen und
  Haushalte aus der Gästeliste.
- **Fehlt eine Übersetzung**, erscheint Deutsch, und die Konsole meldet
  `Übersetzung fehlt`.
- **Sprachwechsel verliert nichts**, auch nicht halb Getipptes.

Erster Entwurf. Beim Gegenlesen: Vietnamesisch sagt „bạn" – für ältere
Verwandte womöglich zu locker. Spanisch ist neutral-lateinamerikanisch.

### Schriften und Karten

Cormorant Garamond von Google Fonts, Fallback Georgia. Karten sind
OpenStreetMap-`<iframe>`s ohne Schlüssel, sie laden erst beim Hinscrollen.

---

## Planung

`planung.html` zeigt ohne Anmeldung alles außer den Küchenangaben:

- **Antworten**: Zusagen, Kinder, Plätze Standesamt (von 25), Schlafplätze,
  Frist, Gruppen, Haushalte ohne Antwort.
- **Allergien und Buffet** (nur angemeldet): jede Küchenangabe mit
  automatischem Abgleich gegen die Buffet-Allergene – über Stichwörter in
  allen vier Sprachen. Findet viel, nicht alles; die Angaben selbst stehen
  immer darunter. Gerichte ganz ohne Zutaten werden eigens gemeldet.
- **Buffet**, **Musikwünsche**, **Versand**, **Export** als CSV.

Die Anmeldung speichert ihre Sitzung getrennt von der Einladung. Sonst
schickte die Einladung im selben Browser ihre Anfragen als „angemeldet" –
dafür hat sie keine Rechte, Zusagen würden scheitern.

Wer sich anmeldet, aber nicht in `planer` steht, wird sofort wieder
abgemeldet.

---

## Datenmodell

| Spalte | Werte |
|---|---|
| `art` | `Erwachsen`, `Kind`, `Bedienste` |
| `zugehoerigkeit` | `Christina`, `Thanh`, `Bedienste` |
| `standesamt` | `Ja`, `Nein`, `(Ja)` |
| `familie` | Haushalt, z. B. `Nahel & Svijetlana` |
| `schlafort` | `Hotel`, `Airbnb`, `??` … `null` = keiner nötig |
| `rollen` | Freitext-Array, wörtlich aus eurer Liste |
| `link` | Code für den persönlichen Link, gleich für den ganzen Haushalt |
| `sprache` | `de`, `en`, `es`, `vi` – gesetzt in `planung.html` |

---

## Echte Daten gehören nicht auf GitHub

`*.csv`, `import.sql` und die Projekt-Notizen in `0*-*/` stehen in
`.gitignore`. Alles andere im Repo ist öffentlich **und** auf der Website
abrufbar – Netlify veröffentlicht den ganzen Ordner.

## Nach der Feier

1. `planung.html` → **Sichern**: alle vier Tabellen als CSV herunterladen.
2. `FEIER.fotos` in `feier.js` eintragen, pushen – die Danke-Seite zeigt
   den Knopf zur Galerie.
3. Nach ein paar Wochen aufräumen, im SQL-Editor:
   ```sql
   truncate kueche;                                  -- Gesundheitsangaben
   update storage.buckets set public = false where id = 'gaeste-fotos';
   ```
4. Netlify → Projekt auf privat stellen oder löschen.

Fotos und Gesundheitsangaben von 44 Menschen müssen nicht dauerhaft online
sein.

---

## Offen

- **Übernachten**: Die Karte bleibt ausgeblendet, bis in `sprachen.js`
  unter `schlafen` Text steht.
- **Antwortfrist** 15. November ist ein Vorschlag – in `feier.js` änderbar.
- **Tanzworkshop** 16:00 ist ein Vorschlag – in `feier.js`.
- **Übersetzungen** gegenlesen.
- Zählt `(Ja)` beim Standesamt gegen das 25er-Limit? Aktuell ja, damit steht
  es bei genau 25/25.
- „Lea (Kind)" ist ein Platzhalter, weil `Lea` doppelt vorkam.
- Das Repo ist öffentlich. Zusammen mit dem Schlüssel in `feier.js` ist die
  Gästeliste für jeden lesbar, der das Repo findet. Privat stellen:
  GitHub → Settings → General → Change visibility.
