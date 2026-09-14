# Traufeier

Einladung und Gäste-Board für die **Traufeier** von Christina und Thanh –
standesamtlich, im kleinen Kreis, mit einem langen Abend danach. Die große
Hochzeit kommt später; die Seite sagt das auf der ersten Ansicht.

Eine HTML-Datei. Kein Build-Schritt, kein npm.

Läuft auf: **Netlify** (Hosting) + **Supabase** (Daten & Fotos)
Ziel-Adresse: `hochzeit.nthanh.de`

---

## Einrichtung – in dieser Reihenfolge

### 1. Datenbank anlegen

Supabase → **SQL Editor** → Inhalt von `schema.sql` einfügen → **Run**.

Legt drei Tabellen an:

| Tabelle | Wer schreibt | Wer liest |
|---|---|---|
| `gaeste` | ihr, im Dashboard | alle |
| `profile` | die Gäste | alle |
| `kueche` | die Gäste | **nur ihr** |

Allergien liegen bewusst getrennt. Ohne echten Login kann die App „dieser Gast"
nicht von „irgendein Gast" unterscheiden – deshalb darf der öffentliche
Schlüssel diese Tabelle nur beschreiben, nie auslesen. Ihr lest sie im
Table Editor.

Schlüssel ist überall der **Name** – `on update cascade` sorgt dafür, dass
Tippfehler-Korrekturen automatisch auf die anderen Tabellen durchschlagen.
Namen müssen deshalb eindeutig sein.

Dazu kommen drei Views zum Draufschauen: `uebersicht` (alles zusammen),
`standesamt_stand` (fest / unsicher / frei) und `schlafplaetze`.

Den Foto-Bucket `gaeste-fotos` legt das Skript gleich mit an – im Dashboard
ist nichts zu klicken. („Public" heißt nur öffentlich *lesen*; ohne die
mitgelieferte Policy scheitert jeder Upload.)

### 2. Mitbring-Buffet nachziehen

`speisen.sql` in den SQL-Editor → **Run**. Legt die Tabelle `speisen` an
und ändert nichts an den bestehenden Tabellen. Solange sie fehlt, läuft
die Seite weiter – der Reiter „Speisen“ bleibt dann nur leer und im
Browser-Log steht ein Hinweis.

Dazu kommen drei Views: `buffet` (alles, was mitgebracht wird),
`buffet_stand` (was pro Kategorie zusammenkommt) und `buffet_allergene`
(welches Allergen in welchem Gericht steckt – die Gegenprobe zu dem,
was euch die Gäste über `kueche` geschickt haben).

### 3. Eure Angaben eintragen

Zwei Dateien, sauber getrennt:

- **`index.html`** enthält nur, was in jeder Sprache gleich ist: Datum,
  Zeiten, Adressen, Koordinaten.
- **`sprachen.js`** enthält alle Texte der Seite in Deutsch, Englisch,
  Spanisch und Vietnamesisch.

Wer einen Text ändern will, ändert ihn in `sprachen.js` – in allen vier
Sprachen. Wer eine Uhrzeit ändert, ändert sie in `index.html`.

**`FEIER`** in `index.html` – Datum und Zeiten:

```js
const FEIER = {
  tag: "2026-12-12",                      // JJJJ-MM-TT
  trauung: { von: "10:45", bis: "11:30" },
  fest:    { von: "12:30", bis: "22:00" },
};
```

`tag` ist die einzige Stelle, an der das Datum steht. Daraus entstehen das
ausgeschriebene Datum im Kopf – in jeder Sprache richtig formatiert
(„Samstag, 12. Dezember 2026", „Thứ Bảy, 12 tháng 12, 2026") –, der
Countdown und der Kalendereintrag. Liegt das Datum in der Vergangenheit,
verschwindet der Countdown stillschweigend.

**`ORTE`** – Trauzimmer und Tanzschule mit Adresse, Koordinaten und den
Symbolen vor den Hinweisen (`marken`). Die Koordinaten sind gegen
OpenStreetMap geprüft; sie treiben die Karte, beide Routen-Knöpfe und das
`GEO:`-Feld im Kalendereintrag. Wer die Adresse ändert, muss `lat`/`lon`
mitziehen. Die Hinweistexte stehen in `sprachen.js` unter `orteHinweise`,
in derselben Reihenfolge wie `marken`.

**`ABLAUF`** – die Zeiten des Tages. `nebensache: true` stellt einen Punkt
gedämpft dar (so steht die Trauung dabei, ohne die Feier zu überstrahlen),
`ort: "trauung"` oder `ort: "fest"` erzeugt den Sprunglink zur passenden
Karte. Titel und Text stehen in `sprachen.js` unter `ablauf` – **gleiche
Reihenfolge, gleiche Anzahl**. Ein Punkt mehr heißt: eine Zeile in
`index.html` und eine Zeile je Sprache in `sprachen.js`.

### 4. Zugangsdaten eintragen

In `index.html` im Script-Block:

```js
const SUPABASE_URL = 'https://jlwpzsdpezjxsgefbiws.supabase.co';
const SUPABASE_KEY = 'sb_publishable_HIER-EINTRAGEN';
```

Der Schlüssel steht unter **Settings → API Keys**.

**Nimm den `sb_publishable_…`-Key**, nicht den alten `anon`-Key aus dem
Legacy-Tab: Supabase schaltet anon und service_role Ende 2026 ab. Mit dem
Legacy-Key würde die Einladung mitten in der Planung aufhören zu funktionieren.

Der publishable Key darf öffentlich im Quelltext stehen – dafür ist er gemacht.
Was er darf, regeln die Policies aus Schritt 1.
Der `sb_secret_…`-Key gehört **niemals** in diese Datei.

### 5. Gästeliste importieren

`import.sql` in den SQL-Editor → **Run**. Enthält alle 44 Gäste, erzeugt aus
`Eheschließung - Gästeliste.csv`.

Das Skript beginnt mit `truncate gaeste cascade` und lässt sich deshalb
beliebig oft wiederholen. **Achtung:** Das löscht auch Profile und
Küchenhinweise. Sobald Gäste angefangen haben, Daten einzutragen, nicht mehr
neu importieren – dann einzelne Zeilen im Table Editor pflegen.

Neu erzeugen lässt sich die Datei aus der CSV jederzeit; das Skript dafür
steht im Verlauf dieses Projekts.

### 6. Lokal testen

```bash
python -m http.server 8000
```

Dann `http://localhost:8000` öffnen – **nicht** per Doppelklick auf die Datei.
Bei `file://` blockiert Chrome die Modul-Importe, und der Fehler sieht aus wie
ein Datenbankproblem.

### 7. Veröffentlichen

Ordner auf [app.netlify.com/drop](https://app.netlify.com/drop) ziehen,
oder das Repo in Netlify verbinden (dann deployt jeder Push automatisch).

Danach in Netlify **Domain management → Add a domain** →
`hochzeit.nthanh.de`, und bei INWX einen CNAME setzen:

| Typ | Host | Wert | TTL |
|---|---|---|---|
| CNAME | `hochzeit` | `DEIN-SITE-NAME.netlify.app` | 300 |

Der spezifische CNAME sticht den Wildcard-Eintrag von INWX.

### 8. Keep-Alive scharf schalten

Supabase pausiert Free-Projekte nach **7 Tagen ohne API-Anfrage** – dann lädt
die Einladung keine Daten mehr. `.github/workflows/keepalive.yml` verhindert das.

Im GitHub-Repo unter **Settings → Secrets and variables → Actions** anlegen:

- `SUPABASE_URL`
- `SUPABASE_KEY`

Danach unter **Actions** einmal manuell auslösen und prüfen, dass `200` kommt.

> GitHub deaktiviert geplante Workflows in Repos, in denen 60 Tage nichts
> passiert. Setz dir zusätzlich eine monatliche Erinnerung, die Seite einmal
> selbst zu öffnen – das zählt als Anfrage und ist der verlässlichste Schutz.

---

## Aufbau der Seite

Fünf Ansichten unter einem festen Kopf, in vier Sprachen:

| Ansicht | Zeigt |
|---|---|
| Einladung | Ablauf, beide Orte mit Karte, Übernachtung – und für Unbekannte die Namensauswahl |
| Mein Platz | eigene Stammdaten, Haushalt, Checkliste, Zusage, Steckbrief, Foto, Küche, eigene Buffet-Beiträge |
| Speisen | das Mittagsbuffet: wer bringt was mit, mit Zutaten und Allergenen |
| Gäste | alle Gäste, filterbar; ein Tipp auf eine Karte zeigt den Steckbrief |
| Helfer | wer welche Aufgabe übernommen hat, plus die guten Geister |

Der Kopf ist beim ersten Besuch eine Einladungskarte mit Countdown. Sobald
klar ist, wer da ist, schrumpft er auf eine Zeile und macht Platz für die
Navigation. Gesteuert wird das über die Klasse `angemeldet` am `body`.

### Wer gerade antwortet

Unter der Navigation steht immer „Du antwortest als …“ mit einem
Wechsel-Link. Dahinter liegen zwei Wege: die Mitbewohner aus dem eigenen
Haushalt als Knöpfe mit ihrem aktuellen Stand („kommt“, „noch offen“), und
darunter die volle Gästeliste.

Das ist der Grund, warum es keinen Login gibt: Eltern beantworten so in
einem Klick die Zusage ihrer Kinder, ohne sich vier Mal neu anzumelden.
Beim Wechsel werden die Küchenfelder geleert – sonst landen Annas
Allergien bei Bruno.

### Kalender

Der Knopf „In meinen Kalender eintragen“ baut die `.ics` im Browser aus
`FEIER` und `ORTE`; es liegt keine Datei im Repo, die veralten könnte. Wer
beim Standesamt dabei ist (`standesamt` = `Ja` oder `(Ja)`), bekommt zwei
Termine, alle anderen nur die Feier.

Die Zeitzone steht als vollständiger `VTIMEZONE`-Block drin. Ohne den
rutscht der Termin in manchen Kalendern um eine Stunde.

### Helfer

Die Ansicht dreht die Gästeliste um: nicht „wer hat welche Rolle“, sondern
„wer macht das hier“. Rollen mit Fragezeichen (`DJ?`, `Technik?`) stehen mit
dem Vermerk **noch offen** da. „Braut“ und „Bräutigam“ sind ausgenommen –
das sind keine Aufgaben, die jemand übernimmt.

### Mitbring-Buffet

Mittags gibt es ein Buffet aus dem, was die Gäste mitbringen; abends wird
gekocht und niemand bringt etwas mit. Die Seite trennt das deutlich – der
Abendblock im Reiter „Speisen“ hat bewusst kein Eingabefeld.

Eingetragen wird in „Mein Platz“, angesehen unter „Speisen“. Ein Gast darf
mehrere Beiträge haben (Salat *und* Getränke), deshalb eine eigene Tabelle
statt eines Feldes an `profile`.

Die Kategorien stehen in `KATEGORIEN` im Script. `art: null` heißt „der Gast
schreibt selbst hin, was es ist“ – so sind Getränke, Kuchen oder Deko
abgedeckt, ohne dass die Liste sie vorwegnehmen muss. Eine Kategorie mehr
ist eine Zeile mehr im Array; die Datenbank bleibt, wie sie ist. Soll aus
Getränken eine eigene Rubrik werden, reicht dort ein
`{ bereich: "Mittagsbuffet", art: "Getränke" }`.

Allergene sind Häkchen (`ALLERGENE`), nicht Freitext – nur so lässt sich
die Liste filtern. Das Zutatenfeld bleibt zusätzlich, weil kein Häkchen
„Koriander“ abdeckt.

**Zutaten sind nicht dasselbe wie Allergien.** Was in einem Salat steckt,
ist eine Rezeptangabe und steht offen da. Was ein Mensch nicht verträgt,
liegt weiter in `kueche`, aus der nichts wieder herauskommt. Beide Seiten
greifen ineinander: Wer eine Allergie gemeldet hat, liest die Speisenliste.

**Zurücknehmen statt löschen.** Ein Gast, der absagt, setzt
`zurueckgezogen` – die Zeile verschwindet aus der Liste, bleibt aber in der
Tabelle. Ohne Login kann jeder alles anfassen; ein Fehlklick soll keine
drei Wochen Planung kosten.

Die Lückenanzeige nennt nur Kategorien, in denen **gar nichts** steht.
Bewusst keine Zielzahlen: wie viel für 44 Leute reicht, schätzt jeder
selbst besser ein als eine ausgedachte Sollgröße.

### Sprachen

Oben rechts steht immer DE · EN · ES · VI – auch vor der Anmeldung, weil
es da noch keine Navigation gibt. Beim ersten Besuch wählt die Seite die
Sprache des Browsers, danach die zuletzt gewählte.

Ein paar Regeln, die man beim Pflegen kennen muss:

- **Datenbankwerte bleiben deutsch.** Wer auf Spanisch „huevo" anhakt,
  speichert `Ei`. Sonst würde ein Filter in einer Sprache die Einträge aus
  einer anderen nicht finden. In `sprachen.js` steht deshalb bei `art`,
  `allergen` und `kennzeichen` links der Datenbankwert – nur rechts
  übersetzen.
- **Was Gäste schreiben, bleibt, wie sie es schreiben.** Steckbriefe,
  Gerichte, Zutaten, aber auch die Rollen und Haushalte aus eurer
  Gästeliste werden nicht übersetzt.
- **Fehlt eine Übersetzung**, erscheint der deutsche Text, und die
  Browser-Konsole meldet `Übersetzung fehlt: vi schluessel`.
- **Sprachwechsel verliert nichts.** Halb Getipptes in einem Formular oder
  im offenen Eintragen-Dialog bleibt stehen; nur die Beschriftung wechselt.
- Auch der Kalendereintrag kommt in der gewählten Sprache.

Die Übersetzungen sind ein erster Entwurf. Beim Gegenlesen besonders
prüfen: Vietnamesisch spricht Gäste mit „bạn" an – für ältere Verwandte
womöglich zu locker. Spanisch ist neutral-lateinamerikanisch („ustedes",
„auto").

### Schriften und Karten

Schriften kommen von Google Fonts (Cormorant Garamond). Wer das nicht will,
lädt die zwei `.woff2` herunter, legt sie neben `index.html` und ersetzt den
`<link>` durch ein `@font-face` – der Fallback (Georgia) steht schon im
Stylesheet.

Die Karten sind `<iframe>`s von OpenStreetMap, ohne API-Schlüssel und ohne
Konto. Sie laden erst, wenn jemand hinunterscrollt (`loading="lazy"`).

---

## Datenmodell

Die Spalten folgen eurer Gästeliste, nicht einem Lehrbuch:

| Spalte | Werte |
|---|---|
| `art` | `Erwachsen`, `Kind`, `Bedienste` |
| `zugehoerigkeit` | `Christina`, `Thanh`, `Bedienste` |
| `standesamt` | `Ja`, `Nein`, `(Ja)` |
| `familie` | Haushalt, z. B. `Nahel & Svijetlana` |
| `schlafort` | `Hotel`, `Airbnb`, `??` … `null` = keiner nötig |
| `rollen` | Freitext-Array, wörtlich aus eurer Liste |

Rollen mit Fragezeichen (`Technik?`, `DJ?`) zeigt die App gestrichelt statt
wie feste Zusagen. Neue Rollen brauchen keine Code-Änderung.

---

## Echte Daten gehören nicht auf GitHub

`*.csv` und `import.sql` stehen in `.gitignore`. Sie enthalten Namen,
Haushalte und Übernachtungen von 44 realen Personen.

## Nach der Hochzeit

- Storage-Bucket löschen oder auf privat stellen
- `kueche` leeren

Fotos und Gesundheitsangaben von 44 Menschen müssen nicht dauerhaft online sein.

---

## Was noch fehlt

Bewusst weggelassen, bis ihr merkt, dass ihr es braucht:

- **Kein Login.** Wer den Link hat, kann jedes Profil ändern. Bei 44 Leuten,
  die sich kennen, ist das vertretbar. Falls doch nötig: PIN pro Gast.
- **Kein Admin-Interface.** Stammdaten pflegt ihr im Table Editor,
  nachgereichte Fotos zieht ihr direkt in den Storage-Bucket.
- **Keine Mengenplanung.** Die Seite zählt, was zusammenkommt, sagt aber
  nicht, ob es reicht. Das schätzt ihr besser ein als ein Algorithmus.

## Offen

- Zählt `(Ja)` beim Standesamt gegen das 25er-Limit? Betrifft Kyan und Yuna.
  Aktuell: ja, damit steht es bei genau 25/25. Die Zahl steht nur noch in der
  View `standesamt_stand` – die Gäste sehen sie nicht mehr.
- „Lea (Kind)“ ist ein Platzhalter, weil `Lea` doppelt vorkam.
- Der Erich-Sanders-Weg liegt in **Süchteln**, nicht in Dülken – gut 5 km vom
  Trauzimmer. Auf der Seite steht das als Warnung bei der Tanzschule.
- Offen im `ABLAUF`: wann es Essen gibt. 17:00 Uhr ist geschätzt, ebenso
  20:00 Uhr fürs Tanzen – Trauung (10:45–11:30), Beginn (13:00) und Ende
  (22:00) stehen fest.
- Offen in `FEIER`: der Text zum Übernachten.
- Die Feier ist im **Dezember**. Falls es Garderobe, Winterschuh- oder
  Anreisehinweise braucht, gehören sie als weitere Zeile in `ORTE.fest.hinweise`.
