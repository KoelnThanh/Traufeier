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

### 2. Eure Angaben eintragen

Ganz oben im Script-Block von `index.html` stehen drei Blöcke. Alles, was
noch fehlt, ist dort als sichtbares `TODO:` markiert – damit nichts
unbemerkt stehen bleibt.

**`FEIER`** – Datum und Zeiten:

```js
const FEIER = {
  datum: "Samstag, 12. Dezember 2026",  // ausgeschrieben, für den Kopf
  tag: "2026-12-12",                    // JJJJ-MM-TT, Countdown UND Kalender
  trauung: { von: "10:45", bis: "11:30" },
  fest:    { von: "13:00", bis: "22:00" },
};
```

`tag` ist die einzige Stelle, an der das Datum maschinenlesbar steht.
Fehlt es oder liegt es in der Vergangenheit, verschwindet der Countdown
stillschweigend – die Seite bleibt heil, der Kalenderknopf sagt Bescheid.

**`ORTE`** – Trauzimmer und Tanzschule, jeweils mit Adresse, Koordinaten
und einer Liste von Hinweisen. Die Koordinaten sind gegen OpenStreetMap
geprüft; sie treiben die Karte, beide Routen-Knöpfe und das `GEO:`-Feld im
Kalendereintrag. Wer die Adresse ändert, muss `lat`/`lon` mitziehen.

**`ABLAUF`** – der Tagesplan als Array. `nebensache: true` stellt einen
Punkt gedämpft dar (so steht die Trauung dabei, ohne die Feier zu
überstrahlen), `ort: "trauung"` oder `ort: "fest"` erzeugt den Sprunglink
zur passenden Karte. Ein Punkt mehr heißt: eine Zeile mehr im Array.

### 3. Zugangsdaten eintragen

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

### 4. Gästeliste importieren

`import.sql` in den SQL-Editor → **Run**. Enthält alle 44 Gäste, erzeugt aus
`Eheschließung - Gästeliste.csv`.

Das Skript beginnt mit `truncate gaeste cascade` und lässt sich deshalb
beliebig oft wiederholen. **Achtung:** Das löscht auch Profile und
Küchenhinweise. Sobald Gäste angefangen haben, Daten einzutragen, nicht mehr
neu importieren – dann einzelne Zeilen im Table Editor pflegen.

Neu erzeugen lässt sich die Datei aus der CSV jederzeit; das Skript dafür
steht im Verlauf dieses Projekts.

### 5. Lokal testen

```bash
python -m http.server 8000
```

Dann `http://localhost:8000` öffnen – **nicht** per Doppelklick auf die Datei.
Bei `file://` blockiert Chrome die Modul-Importe, und der Fehler sieht aus wie
ein Datenbankproblem.

### 6. Veröffentlichen

Ordner auf [app.netlify.com/drop](https://app.netlify.com/drop) ziehen,
oder das Repo in Netlify verbinden (dann deployt jeder Push automatisch).

Danach in Netlify **Domain management → Add a domain** →
`hochzeit.nthanh.de`, und bei INWX einen CNAME setzen:

| Typ | Host | Wert | TTL |
|---|---|---|---|
| CNAME | `hochzeit` | `DEIN-SITE-NAME.netlify.app` | 300 |

Der spezifische CNAME sticht den Wildcard-Eintrag von INWX.

### 7. Keep-Alive scharf schalten

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

Vier Ansichten unter einem festen Kopf:

| Ansicht | Zeigt |
|---|---|
| Einladung | Ablauf, beide Orte mit Karte, Übernachtung – und für Unbekannte die Namensauswahl |
| Mein Platz | eigene Stammdaten, Haushalt, Checkliste, Zusage, Steckbrief, Foto, Küche |
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
- **Kein Mitbring-Board.** Wer etwas beisteuern will, schreibt es bis auf
  Weiteres ins Feld „Sonstige Hinweise“.

## Als Nächstes geplant

- **Reiter „Essen“ und „Trinken“** – wer bringt was mit. Das Essen mit
  Zutatenliste, damit sich Allergien dagegen prüfen lassen; die Getränke
  einfacher, eher als Zählliste.
- Beides braucht je eine Tabelle und die Entscheidung, ob die Listen für
  alle Gäste sichtbar sind oder nur für euch. Die Zutaten sind der Grund,
  warum das nicht einfach in `kueche` mitläuft: dort kommt bewusst nichts
  wieder heraus.

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
