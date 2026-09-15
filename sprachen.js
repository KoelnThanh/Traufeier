// =====================================================================
//  Traufeier – alle Texte der Seite, in vier Sprachen
//
//  Regeln fuer diese Datei:
//
//  - Schluessel nie umbenennen, nur Werte aendern. index.html liest sie.
//  - Fehlt ein Schluessel in einer Sprache, erscheint der deutsche Text
//    und die Browser-Konsole meldet "Übersetzung fehlt".
//  - {name}, {n} usw. sind Platzhalter und bleiben stehen.
//  - Werte mit { one, other } sind Einzahl/Mehrzahl.
//  - In 'art', 'allergen' und 'kennzeichen' ist der LINKE Teil der Wert,
//    der in der Datenbank steht. Der bleibt deutsch – nur rechts
//    uebersetzen. Sonst findet ein Filter auf Spanisch die deutschen
//    Eintraege nicht mehr.
//  - 'ablauf' und 'haltung' haben dieselbe Reihenfolge wie ABLAUF in
//    index.html; 'orteHinweise' dieselbe wie ORTE[...].marken.
//  - HTML ist erlaubt, wo es schon steht (<strong>, <br>, <span>).
//
//  Erster Entwurf. Die Uebersetzungen werden vor dem Versand noch
//  gemeinsam gegengelesen – besonders Vietnamesisch und Spanisch.
// =====================================================================

export const TEXTE = {
  // ===================================================================
  de: {
    _name: "Deutsch",
    _locale: "de-DE",

    "sprache.aria": "Sprache",

    "hero.ueberzeile": "Wir heiraten",
    "hero.einordnung":
      "Es ist unsere <strong>Traufeier</strong> – standesamtlich, im kleinen Kreis, mit einem langen Tag danach. Die große Hochzeit feiern wir später.",
    "hero.zweisaetze":
      "Schenkt uns nichts, kommt einfach.<br>Und zieht euch schick an.",
    "countdown.tage": "Noch {n} Tage",
    "countdown.morgen": "Morgen ist es so weit",
    "countdown.heute": "Heute ist der Tag",

    "nav.einladung": "Einladung",
    "nav.profil": "Mein Platz",
    "nav.speisen": "Speisen",
    "nav.board": "Gäste",
    "nav.helfer": "Helfer",
    "als.text": "Du antwortest als",
    "als.wechseln": "wechseln",

    "einl.tag": "Der Tag",
    "kal.knopf": "In meinen Kalender eintragen",
    "kal.hinweis":
      "Lädt eine Termindatei – Handy und Rechner tragen sie von allein ein.",
    "kal.datumFehlt": "Das Datum steht noch nicht fest.",
    "kal.beide": "Trauung und Feier stehen in der Datei.",
    "kal.feier": "Die Feier steht in der Datei.",
    "ics.trauungTitel": "Trauung Christina & Thanh",
    "ics.trauungText":
      "Standesamtliche Trauung im kleinen Kreis. Bitte zehn Minuten früher da sein.",
    "ics.festTitel": "Traufeier Christina & Thanh",
    "ics.festText":
      "Die Feier in der Tanzschule. Alle Infos: https://traufeier.nthanh.de",

    "haltung.titel": "Wie wir feiern",
    "haltung.intro":
      "Eine Traufeier ist keine Hochzeit. Damit ihr wisst, worauf ihr euch einlasst:",

    "orte.titel": "Wo",
    "ort.trauung": "Trauung",
    "ort.fest": "Die Feier",
    "ort.karte": "Größere Karte öffnen",
    "ort.kartenTitel": "Karte: {name}",
    "ort.google": "Route (Google)",
    "ort.apple": "Route (Apple)",
    "ort.kopieren": "Adresse kopieren",
    "ort.website": "Website",

    "schlafen.titel": "Übernachten",

    "auswahl.titel": "Und wer bist du?",
    "auswahl.text":
      "Such dich in der Liste – danach siehst du deinen Platz und die anderen Gäste. Für Kinder und Mitbewohner kannst du danach in einem Klick mitantworten.",
    "auswahl.label": "Dein Name",
    "auswahl.bitte": "Bitte auswählen …",
    "auswahl.weiter": "Weiter",
    "weiter.titel": "Schön, dass du da bist",
    "weiter.text": "Du antwortest gerade als {name}.",
    "weiter.platz": "Zu meinem Platz",
    "weiter.board": "Alle Gäste ansehen",
    "weiter.fuer": "Diese Einladung ist für {namen}.",

    "haushalt.titel": "Dein Haushalt",
    "haushalt.text":
      "Antworte für die anderen gleich mit – ein Klick wechselt hinüber.",
    "platz.versalien": "Dein Platz",
    "fakten.haushalt": "Haushalt",
    "fakten.schlafplatz": "Schlafplatz",
    "fakten.trauung": "Trauung",
    "fakten.ortOffen": "Ja – Ort noch offen",
    "fakten.dabei": "Du bist dabei",
    "fakten.vorgemerkt": "Vorgemerkt",

    "schritte.titel": "Noch zu tun",
    "schritte.zusage": "Zu- oder Absage gegeben",
    "schritte.steckbrief": "Einen Satz über dich geschrieben",
    "schritte.foto": "Ein Foto hochgeladen",
    "schritte.kueche": "Der Küche Bescheid gegeben",
    "schritte.buffet": "Etwas fürs Buffet eingetragen",

    "zusage.titel": "Kommst du?",
    "zusage.aria": "Zusage",
    "zusage.offen": "Noch offen",
    "zusage.ja": "Ja, ich komme",
    "zusage.nein": "Leider nicht",
    "frist.bitte": "Bitte antwortet bis {datum}.",
    "frist.vorbei": "Die Antwortfrist ist vorbei – sagt uns trotzdem Bescheid, wenn sich noch etwas ändert.",
    "jetzt": "jetzt",
    "danke.titel": "Danke, dass ihr da wart.",
    "danke.fotos": "Zu den Fotos",
    "steckbrief.label":
      "Ein Satz über dich <span class='zusatz'>— für die anderen Gäste</span>",
    "steckbrief.ph": "Wie kennst du uns? Was machst du so?",
    "foto.label": "Dein Foto",
    "foto.alt": "Dein aktuelles Foto",
    "foto.schon": "Dein Foto steht schon auf dem Board.",
    "foto.hinweis": "Wird vor dem Hochladen automatisch verkleinert.",
    speichern: "Speichern",
    "speichern.laeuft": "Speichere …",
    "speichern.foto": "Lade Foto …",

    "mitbringen.titel": "Was bringst du mit?",
    "mitbringen.text":
      "Mittags gibt es ein Buffet aus dem, was alle mitbringen. Am Abend wird für euch gekocht – da braucht ihr nichts.",
    "mitbringen.neu": "Etwas hinzufügen",
    "musik.titel": "Welches Lied muss laufen?",
    "musik.text": "Wir sind Tänzer – die Musik ist uns wichtig. Wünsch dir, was dich auf die Tanzfläche holt.",
    "musik.lied": "Lied",
    "musik.liedPh": "z. B. Propuesta Indecente",
    "musik.interpret": "Von wem?",
    "musik.interpretPh": "z. B. Romeo Santos",
    "musik.knopf": "Wünschen",
    "musik.schon": { one: "1 Wunsch bisher", other: "{n} Wünsche bisher" },
    "musik.leer": "Noch hat sich niemand etwas gewünscht.",
    "musik.weg": "zurücknehmen",

    "kueche.titel": "Für die Küche",
    "kueche.hinweis":
      "Sehen nur Christina und Thanh – nicht die anderen Gäste. Aus dem gleichen Grund können wir es dir später nicht wieder anzeigen. Nach der Feier löschen wir es.",
    "kueche.allergien": "Allergien oder Unverträglichkeiten",
    "kueche.allergienPh": "z. B. Nüsse, laktosefrei, vegetarisch",
    "kueche.hinweise": "Sonstige Hinweise",
    "kueche.hinweisePh": "Alles, was wir wissen sollten",
    "kueche.knopf": "An die Küche schicken",
    "kueche.stand":
      "Zuletzt geschickt am {datum}. Nochmal schicken geht jederzeit.",

    "board.zugesagt": "Zugesagt",
    "board.von": "von {n}",
    "board.offen": {
      one: "{n} Person hat noch nicht geantwortet.",
      other: "{n} haben noch nicht geantwortet.",
    },
    "board.fertig": "Alle haben geantwortet.",
    "board.alle": "Alle",
    "board.tipp": "Tipp: Auf einen Gast tippen zeigt seinen Steckbrief.",
    "board.keinSteckbrief": "Hat noch nichts über sich geschrieben.",
    "status.kommt": "kommt",
    "status.kannNicht": "kann nicht",
    "status.offen": "noch offen",
    "zitat.auf": "„",
    "zitat.zu": "“",
    zurueck: "Zurück zu meinem Platz",

    "speisen.titel": "Das Mittagsbuffet",
    "speisen.neu": "Ich bringe etwas mit",
    "speisen.abends": "Abends",
    "speisen.beitraege": { one: "1 Beitrag", other: "{n} Beiträge" },
    "speisen.personen": { one: "1 Person", other: "{n} Personen" },
    "speisen.stand":
      "{beitraege} von {personen} – {mittag} fürs Mittagsbuffet, {anderes} anderes.",
    "speisen.leer": "Noch hat sich niemand eingetragen. Fang gern an.",
    "speisen.luecke": "Hier fehlt noch alles: {liste}.",
    "speisen.voll":
      "In jeder Kategorie steht etwas. Mehr darf trotzdem gern dazu.",
    "speisen.filterAlle": "Alles",
    "speisen.ausserdem": "Außerdem",
    "speisen.nichts": "Hier steht noch nichts.",
    "speisen.meineLeer": "Du hast noch nichts eingetragen.",
    "speisen.aendern": "Ändern",
    "speisen.ohneZutaten": "Zutaten stehen noch nicht dabei.",
    "bereich.Mittagsbuffet": "Mittagsbuffet",
    "bereich.Anderes": "Anderes",
    "kat.label": "{bereich} – {art}",
    "kat.anderes": "Etwas anderes",
    art: {
      herzhaft: "herzhaft",
      "Salat oder Beilage": "Salat oder Beilage",
      "Brot, Dip, Kleinigkeiten": "Brot, Dip, Kleinigkeiten",
      "süß oder Nachtisch": "süß oder Nachtisch",
    },
    allergen: {
      Gluten: "Gluten",
      Milch: "Milch",
      Ei: "Ei",
      Nüsse: "Nüsse",
      Erdnüsse: "Erdnüsse",
      Soja: "Soja",
      Fisch: "Fisch",
      Sellerie: "Sellerie",
      Senf: "Senf",
    },
    kennzeichen: {
      vegetarisch: "vegetarisch",
      vegan: "vegan",
      halal: "halal",
      glutenfrei: "glutenfrei",
      laktosefrei: "laktosefrei",
    },

    "beitrag.fuer": "Für {name}.",
    "beitrag.wofuer": "Wofür?",
    "beitrag.art": "Was für eine Art?",
    "beitrag.artPh": "z. B. Getränke, Kuchen für nachmittags, Deko",
    "beitrag.was": "Was genau?",
    "beitrag.wasPh": "z. B. Kartoffelsalat",
    "beitrag.menge":
      "Für wie viele? <span class='zusatz'>— grob geschätzt</span>",
    "beitrag.mengePh": "z. B. für ca. 10",
    "beitrag.zutaten":
      "Was ist drin? <span class='zusatz'>— damit alle mit Allergien es lesen können</span>",
    "beitrag.zutatenPh": "Kartoffeln, Mayonnaise, Eier, Senf, Gurken, Zwiebeln",
    "beitrag.enthaelt": "Enthält",
    "beitrag.passt": "Passt für",
    "beitrag.eintragen": "Eintragen",
    "beitrag.aenderung": "Änderung speichern",
    "beitrag.zuruecknehmen": "Ich bringe das doch nicht mit",

    "helfer.titel": "Wer macht was",
    "helfer.intro":
      "Aus unserer Gästeliste. Gestrichelt heißt: noch nicht endgültig zugesagt.",
    "helfer.offen": "noch offen",
    "helfer.keine": "Noch sind keine Aufgaben verteilt.",
    "helfer.geister": "Gute Geister",
    "helfer.geisterText": {
      one: "Eine Person hilft uns an dem Tag im Hintergrund.",
      other: "{n} Menschen helfen uns an dem Tag im Hintergrund.",
    },

    schliessen: "Schließen",
    abbrechen: "Abbrechen",
    "wechsel.titel": "Wer antwortet?",
    "wechsel.text": "Du kannst jederzeit wechseln – auch für deine Kinder.",
    "wechsel.andere": "Oder jemand anderes",
    "wechsel.knopf": "Wechseln",

    "m.gespeichert": "Gespeichert für {name}. Danke!",
    "m.fehler": "Das hat nicht geklappt: {text}",
    "m.leer": "Da steht noch nichts drin.",
    "m.kueche": "Ist bei uns angekommen.",
    "m.kopiert": "Adresse kopiert.",
    "m.kopierenFehl": "Kopieren ging nicht – bitte von Hand markieren.",
    "m.keineDb": "Keine Verbindung zur Datenbank: {text}",
    "m.eingetragen": "Eingetragen. Danke!",
    "m.geaendert": "Geändert.",
    "m.raus": "Ist aus der Liste raus.",
    "m.titelFehlt": "Schreib bitte dazu, was du mitbringst.",
    "m.musik": "Steht auf der Liste.",
    "m.liedFehlt": "Schreib bitte dazu, welches Lied.",

    // Leer = Karte "Übernachten" bleibt ausgeblendet.
    schlafen: "",
    abendessen:
      "Um 18:30 Uhr gibt es Abendessen – Suppe und ein paar warme Sachen. Dafür ist gesorgt, ihr müsst nichts mitbringen. Wer kocht, steht unter „Helfer“.",

    ablauf: [
      [
        "Trauung",
        "Im kleinen Kreis, bis etwa 11:30 Uhr. Wer dabei ist, findet es in seinem Platz.",
      ],
      ["Einlass", "Ankommen, anstoßen, Zeit zum Reden."],
      [
        "Mittagsbuffet",
        "Alles, was ihr mitbringt. Was schon zusammengekommen ist, steht unter „Speisen“.",
      ],
      [
        "Tanzworkshop für alle",
        "Grundschritt in einer halben Stunde, ohne Vorkenntnisse. Wir stehen vorn, ihr macht mit – danach kann jeder mittanzen.",
      ],
      [
        "Abendessen",
        "Suppe und ein paar warme Sachen. Hier braucht ihr nichts mitzubringen.",
      ],
      [
        "Unser Tanz, dann eurer",
        "Einmal dürfen wir doch in die Mitte. Danach gehört die Fläche euch.",
      ],
      ["Ende", "Dann machen wir das Licht aus."],
    ],

    haltung: [
      [
        "Schenkt uns nichts",
        "Wirklich nichts. Dass ihr kommt, ist uns mehr wert als alles, was in Geschenkpapier passt.",
      ],
      [
        "Zieht euch schick an",
        "Wir haben Lust auf einen eleganten Tag. Und packt Schuhe ein, in denen ihr tanzen könnt – um 16 Uhr gibt es einen Workshop.",
      ],
      [
        "Es gibt kein Catering – es gibt uns",
        "Mittags bringt jeder etwas mit, und den Teller trägt danach jeder selbst weg. So bleibt es bezahlbar, und wir sind trotzdem alle satt.",
      ],
      [
        "Für die Kinder ist jemand da",
        "Eine Erzieherin passt auf, damit ihr auch mal in Ruhe sitzen, essen und tanzen könnt.",
      ],
      [
        "Wir stellen uns nicht in die Mitte",
        "Kaum Programm mit uns. Uns ist lieber, ihr habt miteinander einen schönen Tag.",
      ],
      [
        "Keine gestellten Fotos",
        "Unsere Fotografin hält fest, was ohnehin passiert. Posieren müsst ihr nicht, wir auch nicht.",
      ],
      [
        "Das große Fest kommt in fünf Jahren",
        "Wenn die Kinder größer sind und wir mit euch wieder richtig lange feiern können. Deshalb ist auch um 22 Uhr Schluss.",
      ],
    ],

    orteHinweise: {
      trauung: [
        "<strong>Bitte zehn Minuten früher da sein.</strong> Um 11:30 Uhr wird der Raum wieder gebraucht.",
        "Parken: direkt am Verwaltungsgebäude, weitere Plätze am Eligiusplatz (rund 100 m) und am Peterboroughplatz.",
        "Verwaltungsgebäude II der Stadt Viersen. Ein Aufzug führt hinauf – auch mit Rollstuhl oder Kinderwagen kein Problem.",
        "25 Sitzplätze. Deshalb ist die Trauung der kleine Teil des Tages.",
        "Standesamt Viersen: <a href='tel:+492162101253'>02162 101-253</a>",
      ],
      fest: [
        "<strong>Süchteln, nicht Dülken.</strong> Von der Trauung sind es gut 5 km – mit dem Auto etwa 15 Minuten.",
        "Parkplätze sind direkt an der Tanzschule – ihr müsst nichts suchen.",
        "Mit dem Bus bis Süchteln Busbahnhof. Die Linien 067, 074 und 083 verbinden Dülken und Süchteln.",
        "Wir feiern bis 22:00 Uhr. Wer ein Taxi braucht, bestellt es besser vorher.",
      ],
    },
  },

  // ===================================================================
  en: {
    _name: "English",
    _locale: "en-GB",

    "sprache.aria": "Language",

    "hero.ueberzeile": "We're getting married",
    "hero.einordnung":
      "It's our <strong>civil wedding celebration</strong> – a small ceremony at the registry office, followed by a long day together. The big wedding comes later.",
    "hero.zweisaetze":
      "No gifts, please – just come.<br>And dress up a little.",
    "countdown.tage": "{n} days to go",
    "countdown.morgen": "It's tomorrow",
    "countdown.heute": "Today's the day",

    "nav.einladung": "Invitation",
    "nav.profil": "My spot",
    "nav.speisen": "Food",
    "nav.board": "Guests",
    "nav.helfer": "Helpers",
    "als.text": "Answering as",
    "als.wechseln": "switch",

    "einl.tag": "The day",
    "kal.knopf": "Add to my calendar",
    "kal.hinweis":
      "Downloads a calendar file – your phone or computer adds it automatically.",
    "kal.datumFehlt": "The date isn't set yet.",
    "kal.beide": "The ceremony and the celebration are both in the file.",
    "kal.feier": "The celebration is in the file.",
    "ics.trauungTitel": "Wedding ceremony Christina & Thanh",
    "ics.trauungText":
      "Civil ceremony in a small circle. Please arrive ten minutes early.",
    "ics.festTitel": "Celebration Christina & Thanh",
    "ics.festText":
      "The celebration at the dance school. All details: https://traufeier.nthanh.de",

    "haltung.titel": "How we celebrate",
    "haltung.intro":
      "A civil wedding celebration isn't a big wedding. So you know what you're in for:",

    "orte.titel": "Where",
    "ort.trauung": "Ceremony",
    "ort.fest": "Celebration",
    "ort.karte": "Open larger map",
    "ort.kartenTitel": "Map: {name}",
    "ort.google": "Directions (Google)",
    "ort.apple": "Directions (Apple)",
    "ort.kopieren": "Copy address",
    "ort.website": "Website",

    "schlafen.titel": "Where to stay",

    "auswahl.titel": "And who are you?",
    "auswahl.text":
      "Find yourself in the list – then you'll see your spot and the other guests. You can answer for your kids and your household with a single tap.",
    "auswahl.label": "Your name",
    "auswahl.bitte": "Please choose …",
    "auswahl.weiter": "Continue",
    "weiter.titel": "Great to have you here",
    "weiter.text": "You're answering as {name}.",
    "weiter.platz": "Go to my spot",
    "weiter.board": "See all guests",
    "weiter.fuer": "This invitation is for {namen}.",

    "haushalt.titel": "Your household",
    "haushalt.text": "Answer for the others too – one tap switches over.",
    "platz.versalien": "Your spot",
    "fakten.haushalt": "Household",
    "fakten.schlafplatz": "Place to sleep",
    "fakten.trauung": "Ceremony",
    "fakten.ortOffen": "Yes – place not decided yet",
    "fakten.dabei": "You're on the list",
    "fakten.vorgemerkt": "Pencilled in",

    "schritte.titel": "Still to do",
    "schritte.zusage": "Said yes or no",
    "schritte.steckbrief": "Wrote a line about yourself",
    "schritte.foto": "Uploaded a photo",
    "schritte.kueche": "Told the kitchen",
    "schritte.buffet": "Signed up for the buffet",

    "zusage.titel": "Are you coming?",
    "zusage.aria": "Reply",
    "zusage.offen": "Not sure yet",
    "zusage.ja": "Yes, I'm coming",
    "zusage.nein": "Sadly not",
    "frist.bitte": "Please reply by {datum}.",
    "frist.vorbei": "The reply deadline has passed – but do let us know if anything changes.",
    "jetzt": "now",
    "danke.titel": "Thank you for being there.",
    "danke.fotos": "See the photos",
    "steckbrief.label":
      "A line about you <span class='zusatz'>— for the other guests</span>",
    "steckbrief.ph": "How do you know us? What do you do?",
    "foto.label": "Your photo",
    "foto.alt": "Your current photo",
    "foto.schon": "Your photo is already on the board.",
    "foto.hinweis": "It's resized automatically before uploading.",
    speichern: "Save",
    "speichern.laeuft": "Saving …",
    "speichern.foto": "Uploading photo …",

    "mitbringen.titel": "What are you bringing?",
    "mitbringen.text":
      "Lunch is a buffet made of whatever everyone brings. Dinner is cooked for you – nothing needed there.",
    "mitbringen.neu": "Add something",
    "musik.titel": "Which song has to be played?",
    "musik.text": "We're dancers – music matters to us. Request whatever gets you on the dance floor.",
    "musik.lied": "Song",
    "musik.liedPh": "e.g. Propuesta Indecente",
    "musik.interpret": "By whom?",
    "musik.interpretPh": "e.g. Romeo Santos",
    "musik.knopf": "Request",
    "musik.schon": { one: "1 request so far", other: "{n} requests so far" },
    "musik.leer": "No requests yet.",
    "musik.weg": "remove",

    "kueche.titel": "For the kitchen",
    "kueche.hinweis":
      "Only Christina and Thanh see this – not the other guests. For the same reason, we can't show it to you again later. We'll delete it after the celebration.",
    "kueche.allergien": "Allergies or intolerances",
    "kueche.allergienPh": "e.g. nuts, lactose-free, vegetarian",
    "kueche.hinweise": "Anything else",
    "kueche.hinweisePh": "Whatever we should know",
    "kueche.knopf": "Send to the kitchen",
    "kueche.stand": "Last sent on {datum}. You can send it again any time.",

    "board.zugesagt": "Coming",
    "board.von": "of {n}",
    "board.offen": {
      one: "{n} person hasn't replied yet.",
      other: "{n} people haven't replied yet.",
    },
    "board.fertig": "Everyone has replied.",
    "board.alle": "All",
    "board.tipp": "Tip: tap a guest to see their profile.",
    "board.keinSteckbrief": "Hasn't written anything yet.",
    "status.kommt": "coming",
    "status.kannNicht": "can't make it",
    "status.offen": "no reply yet",
    "zitat.auf": "“",
    "zitat.zu": "”",
    zurueck: "Back to my spot",

    "speisen.titel": "The lunch buffet",
    "speisen.neu": "I'm bringing something",
    "speisen.abends": "Evening",
    "speisen.beitraege": { one: "1 contribution", other: "{n} contributions" },
    "speisen.personen": { one: "1 person", other: "{n} people" },
    "speisen.stand":
      "{beitraege} from {personen} – {mittag} for the lunch buffet, {anderes} other.",
    "speisen.leer": "Nobody has signed up yet. Feel free to go first.",
    "speisen.luecke": "Nothing here yet: {liste}.",
    "speisen.voll": "Every category has something. More is always welcome.",
    "speisen.filterAlle": "Everything",
    "speisen.ausserdem": "Also coming",
    "speisen.nichts": "Nothing here yet.",
    "speisen.meineLeer": "You haven't added anything yet.",
    "speisen.aendern": "Edit",
    "speisen.ohneZutaten": "No ingredients listed yet.",
    "bereich.Mittagsbuffet": "Lunch buffet",
    "bereich.Anderes": "Other",
    "kat.label": "{bereich} – {art}",
    "kat.anderes": "Something else",
    art: {
      herzhaft: "savoury",
      "Salat oder Beilage": "salad or side",
      "Brot, Dip, Kleinigkeiten": "bread, dips, small bites",
      "süß oder Nachtisch": "sweet or dessert",
    },
    allergen: {
      Gluten: "gluten",
      Milch: "milk",
      Ei: "egg",
      Nüsse: "nuts",
      Erdnüsse: "peanuts",
      Soja: "soy",
      Fisch: "fish",
      Sellerie: "celery",
      Senf: "mustard",
    },
    kennzeichen: {
      vegetarisch: "vegetarian",
      vegan: "vegan",
      halal: "halal",
      glutenfrei: "gluten-free",
      laktosefrei: "lactose-free",
    },

    "beitrag.fuer": "For {name}.",
    "beitrag.wofuer": "What for?",
    "beitrag.art": "What kind?",
    "beitrag.artPh": "e.g. drinks, cake for the afternoon, decorations",
    "beitrag.was": "What exactly?",
    "beitrag.wasPh": "e.g. potato salad",
    "beitrag.menge":
      "For how many? <span class='zusatz'>— a rough guess</span>",
    "beitrag.mengePh": "e.g. for about 10",
    "beitrag.zutaten":
      "What's in it? <span class='zusatz'>— so people with allergies can check</span>",
    "beitrag.zutatenPh":
      "Potatoes, mayonnaise, eggs, mustard, gherkins, onions",
    "beitrag.enthaelt": "Contains",
    "beitrag.passt": "Suitable for",
    "beitrag.eintragen": "Add",
    "beitrag.aenderung": "Save changes",
    "beitrag.zuruecknehmen": "I'm not bringing this after all",

    "helfer.titel": "Who does what",
    "helfer.intro":
      "From our guest list. Dashed means: not fully confirmed yet.",
    "helfer.offen": "not confirmed",
    "helfer.keine": "No tasks assigned yet.",
    "helfer.geister": "Behind the scenes",
    "helfer.geisterText": {
      one: "One person is helping us behind the scenes on the day.",
      other: "{n} people are helping us behind the scenes on the day.",
    },

    schliessen: "Close",
    abbrechen: "Cancel",
    "wechsel.titel": "Who's answering?",
    "wechsel.text": "You can switch any time – for your kids too.",
    "wechsel.andere": "Or someone else",
    "wechsel.knopf": "Switch",

    "m.gespeichert": "Saved for {name}. Thank you!",
    "m.fehler": "That didn't work: {text}",
    "m.leer": "There's nothing in there yet.",
    "m.kueche": "Got it, thanks.",
    "m.kopiert": "Address copied.",
    "m.kopierenFehl": "Couldn't copy – please select it by hand.",
    "m.keineDb": "No connection to the database: {text}",
    "m.eingetragen": "Added. Thank you!",
    "m.geaendert": "Changed.",
    "m.raus": "Removed from the list.",
    "m.titelFehlt": "Please say what you're bringing.",
    "m.musik": "It's on the list.",
    "m.liedFehlt": "Please enter a song.",

    // Leer = Karte "Übernachten" bleibt ausgeblendet.
    schlafen: "",
    abendessen:
      "Dinner is at 18:30 – soup and a few warm dishes. It's all taken care of, you don't need to bring anything. Who's cooking is listed under “Helpers”.",

    ablauf: [
      [
        "Ceremony",
        "In a small circle, until about 11:30. If you're part of it, you'll see it on your spot.",
      ],
      ["Doors open", "Arrive, raise a glass, time to talk."],
      [
        "Lunch buffet",
        "Everything you bring. What's already signed up is under “Food”.",
      ],
      [
        "Dance workshop for everyone",
        "Basic steps in half an hour, no experience needed. We lead, you join in – after that, everyone can dance.",
      ],
      ["Dinner", "Soup and a few warm dishes. Nothing to bring here."],
      [
        "Our dance, then yours",
        "Just this once we'll take centre stage. After that, the floor is yours.",
      ],
      ["The end", "Then we turn out the lights."],
    ],

    haltung: [
      [
        "No gifts, please",
        "Really, nothing. You being there means more to us than anything that fits in wrapping paper.",
      ],
      [
        "Dress up",
        "We'd love an elegant day. And bring shoes you can dance in – there's a workshop at 16:00.",
      ],
      [
        "No catering – just all of us",
        "Everyone brings something for lunch, and everyone takes their own plate back afterwards. That keeps it affordable, and we'll all still be well fed.",
      ],
      [
        "Someone's looking after the kids",
        "A trained childcare worker will be there, so you can actually sit, eat and dance in peace.",
      ],
      [
        "It's not about us",
        "Hardly any programme centred on us. We'd much rather you have a great day together.",
      ],
      [
        "No posed photos",
        "Our photographer captures what happens anyway. No posing needed – not for you, not for us.",
      ],
      [
        "The big party comes in five years",
        "When the kids are older and we can celebrate with you until late again. That's also why we finish at 22:00.",
      ],
    ],

    orteHinweise: {
      trauung: [
        "<strong>Please arrive ten minutes early.</strong> The room is needed again at 11:30.",
        "Parking: right by the building, with more spaces at Eligiusplatz (about 100 m) and Peterboroughplatz.",
        "Administrative Building II of the City of Viersen. A lift takes you up – no problem with a wheelchair or pram.",
        "25 seats. That's why the ceremony is the small part of the day.",
        "Viersen registry office: <a href='tel:+492162101253'>+49 2162 101-253</a>",
      ],
      fest: [
        "<strong>Süchteln, not Dülken.</strong> It's a good 5 km from the ceremony – about 15 minutes by car.",
        "Parking is right at the dance school – no need to search.",
        "By bus to Süchteln Busbahnhof. Lines 067, 074 and 083 connect Dülken and Süchteln.",
        "We celebrate until 22:00. If you need a taxi, best to book it in advance.",
      ],
    },
  },

  // ===================================================================
  //  Spanisch: neutral-lateinamerikanisch ("ustedes", "auto",
  //  "computadora"), weil die Gaeste aus der Bachata-Szene kommen.
  //  In Spanien versteht man es genauso.
  es: {
    _name: "Español",
    _locale: "es-ES",

    "sprache.aria": "Idioma",

    "hero.ueberzeile": "Nos casamos",
    "hero.einordnung":
      "Es nuestra <strong>celebración de boda civil</strong>: una ceremonia pequeña en el registro civil y después un largo día juntos. La gran boda la celebraremos más adelante.",
    "hero.zweisaetze": "Sin regalos, solo vengan.<br>Y vístanse elegantes.",
    "countdown.tage": "Faltan {n} días",
    "countdown.morgen": "Es mañana",
    "countdown.heute": "Hoy es el día",

    "nav.einladung": "Invitación",
    "nav.profil": "Mi lugar",
    "nav.speisen": "Comida",
    "nav.board": "Invitados",
    "nav.helfer": "Ayudantes",
    "als.text": "Respondes como",
    "als.wechseln": "cambiar",

    "einl.tag": "El día",
    "kal.knopf": "Añadir a mi calendario",
    "kal.hinweis":
      "Descarga un archivo de calendario: tu teléfono o computadora lo añade solo.",
    "kal.datumFehlt": "La fecha todavía no está fijada.",
    "kal.beide": "La ceremonia y la celebración están en el archivo.",
    "kal.feier": "La celebración está en el archivo.",
    "ics.trauungTitel": "Boda civil Christina & Thanh",
    "ics.trauungText":
      "Ceremonia civil en un círculo pequeño. Por favor, lleguen diez minutos antes.",
    "ics.festTitel": "Celebración Christina & Thanh",
    "ics.festText":
      "La celebración en la escuela de baile. Toda la información: https://traufeier.nthanh.de",

    "haltung.titel": "Cómo lo celebramos",
    "haltung.intro":
      "Una celebración de boda civil no es una gran boda. Para que sepan qué les espera:",

    "orte.titel": "Dónde",
    "ort.trauung": "Ceremonia",
    "ort.fest": "Celebración",
    "ort.karte": "Abrir mapa más grande",
    "ort.kartenTitel": "Mapa: {name}",
    "ort.google": "Ruta (Google)",
    "ort.apple": "Ruta (Apple)",
    "ort.kopieren": "Copiar dirección",
    "ort.website": "Sitio web",

    "schlafen.titel": "Alojamiento",

    "auswahl.titel": "¿Y tú quién eres?",
    "auswahl.text":
      "Búscate en la lista: después verás tu lugar y a los demás invitados. Por tus hijos y las personas de tu hogar puedes responder con un solo clic.",
    "auswahl.label": "Tu nombre",
    "auswahl.bitte": "Elige, por favor …",
    "auswahl.weiter": "Continuar",
    "weiter.titel": "Qué bien que estés aquí",
    "weiter.text": "Estás respondiendo como {name}.",
    "weiter.platz": "Ir a mi lugar",
    "weiter.board": "Ver a todos los invitados",
    "weiter.fuer": "Esta invitación es para {namen}.",

    "haushalt.titel": "Tu hogar",
    "haushalt.text": "Responde también por los demás: un clic y cambias.",
    "platz.versalien": "Tu lugar",
    "fakten.haushalt": "Hogar",
    "fakten.schlafplatz": "Alojamiento",
    "fakten.trauung": "Ceremonia",
    "fakten.ortOffen": "Sí – lugar por decidir",
    "fakten.dabei": "Estás en la lista",
    "fakten.vorgemerkt": "Apuntado provisionalmente",

    "schritte.titel": "Pendiente",
    "schritte.zusage": "Confirmar si vienes",
    "schritte.steckbrief": "Escribir una frase sobre ti",
    "schritte.foto": "Subir una foto",
    "schritte.kueche": "Avisar a la cocina",
    "schritte.buffet": "Apuntarte para el bufé",

    "zusage.titel": "¿Vienes?",
    "zusage.aria": "Respuesta",
    "zusage.offen": "Todavía no lo sé",
    "zusage.ja": "Sí, voy",
    "zusage.nein": "Lamentablemente no",
    "frist.bitte": "Por favor, respondan antes del {datum}.",
    "frist.vorbei": "El plazo para responder ya pasó, pero avísennos si algo cambia.",
    "jetzt": "ahora",
    "danke.titel": "Gracias por estar con nosotros.",
    "danke.fotos": "Ver las fotos",
    "steckbrief.label":
      "Una frase sobre ti <span class='zusatz'>— para los demás invitados</span>",
    "steckbrief.ph": "¿De qué nos conoces? ¿A qué te dedicas?",
    "foto.label": "Tu foto",
    "foto.alt": "Tu foto actual",
    "foto.schon": "Tu foto ya está en el tablón.",
    "foto.hinweis": "Se reduce automáticamente antes de subirla.",
    speichern: "Guardar",
    "speichern.laeuft": "Guardando …",
    "speichern.foto": "Subiendo la foto …",

    "mitbringen.titel": "¿Qué traes?",
    "mitbringen.text":
      "Al mediodía hay un bufé con lo que trae cada uno. La cena se cocina para ustedes: ahí no hace falta nada.",
    "mitbringen.neu": "Añadir algo",
    "musik.titel": "¿Qué canción no puede faltar?",
    "musik.text": "Somos bailarines: la música nos importa mucho. Pide lo que te haga salir a la pista.",
    "musik.lied": "Canción",
    "musik.liedPh": "p. ej. Propuesta Indecente",
    "musik.interpret": "¿De quién?",
    "musik.interpretPh": "p. ej. Romeo Santos",
    "musik.knopf": "Pedir",
    "musik.schon": { one: "1 petición hasta ahora", other: "{n} peticiones hasta ahora" },
    "musik.leer": "Todavía nadie ha pedido nada.",
    "musik.weg": "quitar",

    "kueche.titel": "Para la cocina",
    "kueche.hinweis":
      "Solo lo ven Christina y Thanh, no los demás invitados. Por la misma razón, después no podemos volver a mostrártelo. Después de la celebración lo borramos.",
    "kueche.allergien": "Alergias o intolerancias",
    "kueche.allergienPh": "p. ej. frutos secos, sin lactosa, vegetariano",
    "kueche.hinweise": "Otras indicaciones",
    "kueche.hinweisePh": "Todo lo que debamos saber",
    "kueche.knopf": "Enviar a la cocina",
    "kueche.stand":
      "Enviado por última vez el {datum}. Puedes volver a enviarlo cuando quieras.",

    "board.zugesagt": "Confirmados",
    "board.von": "de {n}",
    "board.offen": {
      one: "{n} persona todavía no ha respondido.",
      other: "{n} personas todavía no han respondido.",
    },
    "board.fertig": "Todos han respondido.",
    "board.alle": "Todos",
    "board.tipp": "Consejo: toca a un invitado para ver su perfil.",
    "board.keinSteckbrief": "Todavía no ha escrito nada.",
    "status.kommt": "viene",
    "status.kannNicht": "no puede",
    "status.offen": "sin respuesta",
    "zitat.auf": "«",
    "zitat.zu": "»",
    zurueck: "Volver a mi lugar",

    "speisen.titel": "El bufé del mediodía",
    "speisen.neu": "Yo traigo algo",
    "speisen.abends": "Por la noche",
    "speisen.beitraege": { one: "1 aportación", other: "{n} aportaciones" },
    "speisen.personen": { one: "1 persona", other: "{n} personas" },
    "speisen.stand":
      "{beitraege} de {personen}: {mittag} para el bufé, {anderes} de otro tipo.",
    "speisen.leer": "Todavía no se ha apuntado nadie. Anímate a empezar.",
    "speisen.luecke": "Aquí todavía falta todo: {liste}.",
    "speisen.voll":
      "Hay algo en cada categoría. Aun así, más siempre es bienvenido.",
    "speisen.filterAlle": "Todo",
    "speisen.ausserdem": "Además",
    "speisen.nichts": "Todavía no hay nada.",
    "speisen.meineLeer": "Todavía no has añadido nada.",
    "speisen.aendern": "Editar",
    "speisen.ohneZutaten": "Todavía no hay ingredientes.",
    "bereich.Mittagsbuffet": "Bufé del mediodía",
    "bereich.Anderes": "Otros",
    "kat.label": "{bereich} – {art}",
    "kat.anderes": "Otra cosa",
    art: {
      herzhaft: "salado",
      "Salat oder Beilage": "ensalada o guarnición",
      "Brot, Dip, Kleinigkeiten": "pan, salsas, bocaditos",
      "süß oder Nachtisch": "dulce o postre",
    },
    allergen: {
      Gluten: "gluten",
      Milch: "leche",
      Ei: "huevo",
      Nüsse: "frutos secos",
      Erdnüsse: "maní",
      Soja: "soja",
      Fisch: "pescado",
      Sellerie: "apio",
      Senf: "mostaza",
    },
    kennzeichen: {
      vegetarisch: "vegetariano",
      vegan: "vegano",
      halal: "halal",
      glutenfrei: "sin gluten",
      laktosefrei: "sin lactosa",
    },

    "beitrag.fuer": "Para {name}.",
    "beitrag.wofuer": "¿Para qué?",
    "beitrag.art": "¿De qué tipo?",
    "beitrag.artPh": "p. ej. bebidas, pastel para la tarde, decoración",
    "beitrag.was": "¿Qué exactamente?",
    "beitrag.wasPh": "p. ej. ensalada de papas",
    "beitrag.menge":
      "¿Para cuántas personas? <span class='zusatz'>— más o menos</span>",
    "beitrag.mengePh": "p. ej. para unas 10",
    "beitrag.zutaten":
      "¿Qué lleva? <span class='zusatz'>— para que quien tenga alergias pueda leerlo</span>",
    "beitrag.zutatenPh":
      "Papas, mayonesa, huevos, mostaza, pepinillos, cebolla",
    "beitrag.enthaelt": "Contiene",
    "beitrag.passt": "Apto para",
    "beitrag.eintragen": "Apuntar",
    "beitrag.aenderung": "Guardar cambios",
    "beitrag.zuruecknehmen": "Al final no lo traigo",

    "helfer.titel": "Quién hace qué",
    "helfer.intro":
      "De nuestra lista de invitados. Con línea discontinua: todavía no está confirmado del todo.",
    "helfer.offen": "sin confirmar",
    "helfer.keine": "Todavía no hay tareas repartidas.",
    "helfer.geister": "Ángeles de la guarda",
    "helfer.geisterText": {
      one: "Una persona nos ayuda ese día entre bastidores.",
      other: "{n} personas nos ayudan ese día entre bastidores.",
    },

    schliessen: "Cerrar",
    abbrechen: "Cancelar",
    "wechsel.titel": "¿Quién responde?",
    "wechsel.text": "Puedes cambiar cuando quieras, también por tus hijos.",
    "wechsel.andere": "O alguien más",
    "wechsel.knopf": "Cambiar",

    "m.gespeichert": "Guardado para {name}. ¡Gracias!",
    "m.fehler": "No ha funcionado: {text}",
    "m.leer": "Todavía no has escrito nada.",
    "m.kueche": "Recibido, gracias.",
    "m.kopiert": "Dirección copiada.",
    "m.kopierenFehl": "No se pudo copiar; márcala a mano, por favor.",
    "m.keineDb": "Sin conexión con la base de datos: {text}",
    "m.eingetragen": "Apuntado. ¡Gracias!",
    "m.geaendert": "Cambiado.",
    "m.raus": "Quitado de la lista.",
    "m.titelFehlt": "Escribe, por favor, qué vas a traer.",
    "m.musik": "Ya está en la lista.",
    "m.liedFehlt": "Escribe qué canción, por favor.",

    // Leer = Karte "Übernachten" bleibt ausgeblendet.
    schlafen: "",
    abendessen:
      "A las 18:30 hay cena: sopa y algunos platos calientes. Todo está organizado, no hace falta que traigan nada. Quién cocina aparece en «Ayudantes».",

    ablauf: [
      [
        "Ceremonia",
        "En un círculo pequeño, hasta las 11:30 más o menos. Si formas parte, lo verás en tu lugar.",
      ],
      ["Llegada", "Llegar, brindar, tiempo para charlar."],
      [
        "Bufé del mediodía",
        "Todo lo que traigan. Lo que ya está apuntado aparece en «Comida».",
      ],
      [
        "Taller de baile para todos",
        "Pasos básicos en media hora, sin experiencia previa. Nosotros enseñamos, ustedes bailan, y después todo el mundo puede unirse.",
      ],
      [
        "Cena",
        "Sopa y algunos platos calientes. Aquí no hace falta traer nada.",
      ],
      [
        "Nuestro baile, después el suyo",
        "Por una vez sí nos ponemos en el centro. Después, la pista es de ustedes.",
      ],
      ["Fin", "Luego apagamos las luces."],
    ],

    haltung: [
      [
        "Sin regalos",
        "De verdad, nada. Que vengan vale más para nosotros que cualquier cosa envuelta en papel de regalo.",
      ],
      [
        "Vístanse elegantes",
        "Tenemos ganas de un día elegante. Y traigan zapatos con los que puedan bailar: a las 16:00 hay un taller.",
      ],
      [
        "No hay catering: estamos todos",
        "Al mediodía cada uno trae algo, y después cada uno lleva su propio plato. Así sale asequible y todos comemos bien.",
      ],
      [
        "Alguien cuida a los niños",
        "Habrá una educadora infantil para que ustedes también puedan sentarse, comer y bailar tranquilos.",
      ],
      [
        "No queremos ser el centro",
        "Casi nada de programa sobre nosotros. Preferimos que ustedes pasen un día bonito juntos.",
      ],
      [
        "Nada de fotos posadas",
        "Nuestra fotógrafa captura lo que pase de forma natural. Nadie tiene que posar, ni ustedes ni nosotros.",
      ],
      [
        "La gran fiesta, dentro de cinco años",
        "Cuando los niños sean mayores y podamos celebrar con ustedes hasta tarde. Por eso también terminamos a las 22:00.",
      ],
    ],

    orteHinweise: {
      trauung: [
        "<strong>Lleguen diez minutos antes, por favor.</strong> A las 11:30 se vuelve a necesitar la sala.",
        "Estacionamiento: justo al lado del edificio, y más plazas en Eligiusplatz (a unos 100 m) y en Peterboroughplatz.",
        "Edificio administrativo II de la ciudad de Viersen. Hay ascensor: sin problema con silla de ruedas o cochecito.",
        "25 asientos. Por eso la ceremonia es la parte pequeña del día.",
        "Registro civil de Viersen: <a href='tel:+492162101253'>+49 2162 101-253</a>",
      ],
      fest: [
        "<strong>Süchteln, no Dülken.</strong> Desde la ceremonia hay unos 5 km, unos 15 minutos en auto.",
        "Hay estacionamiento justo en la escuela de baile, no hace falta buscar.",
        "En autobús hasta Süchteln Busbahnhof. Las líneas 067, 074 y 083 conectan Dülken y Süchteln.",
        "Celebramos hasta las 22:00. Si necesitas un taxi, mejor pídelo con antelación.",
      ],
    },
  },

  // ===================================================================
  //  Vietnamesisch: "chúng mình" fuer uns, "bạn" fuer einen Gast,
  //  "mọi người" fuer alle. Fuer aeltere Verwandte kann "bạn" zu locker
  //  sein – beim Gegenlesen pruefen.
  vi: {
    _name: "Tiếng Việt",
    _locale: "vi-VN",

    "sprache.aria": "Ngôn ngữ",

    "hero.ueberzeile": "Chúng mình kết hôn",
    "hero.einordnung":
      "Đây là <strong>buổi lễ đăng ký kết hôn</strong> của chúng mình – một nghi thức nhỏ tại phòng hộ tịch, sau đó là một ngày dài bên nhau. Đám cưới lớn sẽ tổ chức sau.",
    "hero.zweisaetze":
      "Xin đừng mang quà, chỉ cần đến thôi.<br>Và nhớ ăn mặc thật đẹp nhé.",
    "countdown.tage": "Còn {n} ngày",
    "countdown.morgen": "Ngày mai là ngày vui",
    "countdown.heute": "Hôm nay là ngày vui",

    "nav.einladung": "Thiệp mời",
    "nav.profil": "Chỗ của tôi",
    "nav.speisen": "Món ăn",
    "nav.board": "Khách mời",
    "nav.helfer": "Người giúp",
    "als.text": "Bạn đang trả lời với tên",
    "als.wechseln": "đổi",

    "einl.tag": "Lịch trình",
    "kal.knopf": "Thêm vào lịch của tôi",
    "kal.hinweis":
      "Tải về một tệp lịch – điện thoại hoặc máy tính sẽ tự thêm vào.",
    "kal.datumFehlt": "Ngày vẫn chưa được ấn định.",
    "kal.beide": "Lễ đăng ký và buổi tiệc đều có trong tệp.",
    "kal.feier": "Buổi tiệc có trong tệp.",
    "ics.trauungTitel": "Lễ đăng ký kết hôn Christina & Thanh",
    "ics.trauungText":
      "Lễ đăng ký kết hôn trong phạm vi nhỏ. Vui lòng đến sớm mười phút.",
    "ics.festTitel": "Tiệc mừng Christina & Thanh",
    "ics.festText":
      "Buổi tiệc tại trường dạy nhảy. Mọi thông tin: https://traufeier.nthanh.de",

    "haltung.titel": "Chúng mình tổ chức thế nào",
    "haltung.intro":
      "Buổi lễ đăng ký kết hôn không phải là đám cưới lớn. Để mọi người biết trước:",

    "orte.titel": "Địa điểm",
    "ort.trauung": "Lễ đăng ký",
    "ort.fest": "Buổi tiệc",
    "ort.karte": "Mở bản đồ lớn hơn",
    "ort.kartenTitel": "Bản đồ: {name}",
    "ort.google": "Chỉ đường (Google)",
    "ort.apple": "Chỉ đường (Apple)",
    "ort.kopieren": "Sao chép địa chỉ",
    "ort.website": "Trang web",

    "schlafen.titel": "Chỗ ngủ",

    "auswahl.titel": "Còn bạn là ai?",
    "auswahl.text":
      "Hãy tìm tên mình trong danh sách – sau đó bạn sẽ thấy chỗ của mình và các khách mời khác. Bạn có thể trả lời cho con cái và người trong nhà chỉ với một lần bấm.",
    "auswahl.label": "Tên của bạn",
    "auswahl.bitte": "Vui lòng chọn …",
    "auswahl.weiter": "Tiếp tục",
    "weiter.titel": "Thật vui vì có bạn ở đây",
    "weiter.text": "Bạn đang trả lời với tên {name}.",
    "weiter.platz": "Đến chỗ của tôi",
    "weiter.board": "Xem tất cả khách mời",
    "weiter.fuer": "Thiệp mời này dành cho {namen}.",

    "haushalt.titel": "Gia đình bạn",
    "haushalt.text":
      "Trả lời luôn cho những người khác – bấm một lần là chuyển sang.",
    "platz.versalien": "Chỗ của bạn",
    "fakten.haushalt": "Gia đình",
    "fakten.schlafplatz": "Chỗ ngủ",
    "fakten.trauung": "Lễ đăng ký",
    "fakten.ortOffen": "Có – chưa rõ ở đâu",
    "fakten.dabei": "Bạn có tên trong danh sách",
    "fakten.vorgemerkt": "Đã ghi tên tạm",

    "schritte.titel": "Việc cần làm",
    "schritte.zusage": "Đã trả lời có đến hay không",
    "schritte.steckbrief": "Đã viết một câu về mình",
    "schritte.foto": "Đã tải ảnh lên",
    "schritte.kueche": "Đã báo cho nhà bếp",
    "schritte.buffet": "Đã đăng ký mang món cho buffet",

    "zusage.titel": "Bạn có đến không?",
    "zusage.aria": "Trả lời",
    "zusage.offen": "Chưa biết",
    "zusage.ja": "Có, tôi sẽ đến",
    "zusage.nein": "Rất tiếc là không",
    "frist.bitte": "Vui lòng trả lời trước {datum}.",
    "frist.vorbei": "Đã quá hạn trả lời – nhưng nếu có gì thay đổi, cứ báo chúng mình nhé.",
    "jetzt": "bây giờ",
    "danke.titel": "Cảm ơn mọi người đã đến chung vui.",
    "danke.fotos": "Xem ảnh",
    "steckbrief.label":
      "Một câu về bạn <span class='zusatz'>— cho các khách mời khác</span>",
    "steckbrief.ph": "Bạn quen chúng mình thế nào? Bạn làm gì?",
    "foto.label": "Ảnh của bạn",
    "foto.alt": "Ảnh hiện tại của bạn",
    "foto.schon": "Ảnh của bạn đã có trên bảng.",
    "foto.hinweis": "Ảnh sẽ được tự động thu nhỏ trước khi tải lên.",
    speichern: "Lưu",
    "speichern.laeuft": "Đang lưu …",
    "speichern.foto": "Đang tải ảnh …",

    "mitbringen.titel": "Bạn mang gì đến?",
    "mitbringen.text":
      "Buổi trưa có tiệc buffet từ những món mọi người mang đến. Buổi tối đã có người nấu – không cần mang gì.",
    "mitbringen.neu": "Thêm món",
    "musik.titel": "Bài hát nào nhất định phải có?",
    "musik.text": "Chúng mình là dân nhảy – âm nhạc rất quan trọng. Hãy chọn bài khiến bạn muốn ra sàn nhảy.",
    "musik.lied": "Bài hát",
    "musik.liedPh": "ví dụ: Propuesta Indecente",
    "musik.interpret": "Của ai?",
    "musik.interpretPh": "ví dụ: Romeo Santos",
    "musik.knopf": "Gửi yêu cầu",
    "musik.schon": { one: "{n} yêu cầu", other: "{n} yêu cầu" },
    "musik.leer": "Chưa có ai yêu cầu bài nào.",
    "musik.weg": "bỏ",

    "kueche.titel": "Cho nhà bếp",
    "kueche.hinweis":
      "Chỉ Christina và Thanh xem được – các khách mời khác thì không. Cũng vì vậy mà sau này chúng mình không thể hiển thị lại cho bạn. Sau buổi tiệc, chúng mình sẽ xóa thông tin này.",
    "kueche.allergien": "Dị ứng hoặc không dung nạp",
    "kueche.allergienPh": "ví dụ: các loại hạt, không lactose, ăn chay",
    "kueche.hinweise": "Lưu ý khác",
    "kueche.hinweisePh": "Bất cứ điều gì chúng mình nên biết",
    "kueche.knopf": "Gửi cho nhà bếp",
    "kueche.stand":
      "Gửi lần cuối vào {datum}. Bạn có thể gửi lại bất cứ lúc nào.",

    "board.zugesagt": "Sẽ đến",
    "board.von": "trên {n}",
    "board.offen": {
      one: "{n} người chưa trả lời.",
      other: "{n} người chưa trả lời.",
    },
    "board.fertig": "Mọi người đều đã trả lời.",
    "board.alle": "Tất cả",
    "board.tipp": "Mẹo: bấm vào một khách mời để xem phần giới thiệu.",
    "board.keinSteckbrief": "Chưa viết gì về mình.",
    "status.kommt": "sẽ đến",
    "status.kannNicht": "không đến được",
    "status.offen": "chưa trả lời",
    "zitat.auf": "“",
    "zitat.zu": "”",
    zurueck: "Quay lại chỗ của tôi",

    "speisen.titel": "Tiệc buffet buổi trưa",
    "speisen.neu": "Tôi sẽ mang món đến",
    "speisen.abends": "Buổi tối",
    "speisen.beitraege": { one: "{n} món", other: "{n} món" },
    "speisen.personen": { one: "{n} người", other: "{n} người" },
    "speisen.stand":
      "{beitraege} từ {personen} – {mittag} cho buffet trưa, {anderes} thứ khác.",
    "speisen.leer": "Chưa có ai đăng ký. Bạn cứ mở màn nhé.",
    "speisen.luecke": "Ở đây vẫn còn trống: {liste}.",
    "speisen.voll":
      "Mục nào cũng đã có món. Thêm nữa vẫn luôn được hoan nghênh.",
    "speisen.filterAlle": "Tất cả",
    "speisen.ausserdem": "Ngoài ra",
    "speisen.nichts": "Chưa có gì ở đây.",
    "speisen.meineLeer": "Bạn chưa thêm gì.",
    "speisen.aendern": "Sửa",
    "speisen.ohneZutaten": "Chưa ghi nguyên liệu.",
    "bereich.Mittagsbuffet": "Buffet trưa",
    "bereich.Anderes": "Khác",
    "kat.label": "{bereich} – {art}",
    "kat.anderes": "Thứ khác",
    art: {
      herzhaft: "món mặn",
      "Salat oder Beilage": "salad hoặc món ăn kèm",
      "Brot, Dip, Kleinigkeiten": "bánh mì, nước chấm, đồ ăn nhẹ",
      "süß oder Nachtisch": "đồ ngọt hoặc tráng miệng",
    },
    allergen: {
      Gluten: "gluten",
      Milch: "sữa",
      Ei: "trứng",
      Nüsse: "các loại hạt",
      Erdnüsse: "đậu phộng",
      Soja: "đậu nành",
      Fisch: "cá",
      Sellerie: "cần tây",
      Senf: "mù tạt",
    },
    kennzeichen: {
      vegetarisch: "ăn chay",
      vegan: "thuần chay",
      halal: "halal",
      glutenfrei: "không gluten",
      laktosefrei: "không lactose",
    },

    "beitrag.fuer": "Cho {name}.",
    "beitrag.wofuer": "Dành cho phần nào?",
    "beitrag.art": "Loại gì?",
    "beitrag.artPh": "ví dụ: đồ uống, bánh ngọt buổi chiều, trang trí",
    "beitrag.was": "Cụ thể là gì?",
    "beitrag.wasPh": "ví dụ: salad khoai tây",
    "beitrag.menge":
      "Cho khoảng bao nhiêu người? <span class='zusatz'>— ước chừng thôi</span>",
    "beitrag.mengePh": "ví dụ: khoảng 10 người",
    "beitrag.zutaten":
      "Có những gì trong đó? <span class='zusatz'>— để người bị dị ứng có thể đọc</span>",
    "beitrag.zutatenPh":
      "Khoai tây, sốt mayonnaise, trứng, mù tạt, dưa chuột muối, hành",
    "beitrag.enthaelt": "Có chứa",
    "beitrag.passt": "Phù hợp cho",
    "beitrag.eintragen": "Đăng ký",
    "beitrag.aenderung": "Lưu thay đổi",
    "beitrag.zuruecknehmen": "Tôi sẽ không mang món này nữa",

    "helfer.titel": "Ai làm gì",
    "helfer.intro":
      "Từ danh sách khách mời của chúng mình. Viền nét đứt nghĩa là chưa xác nhận hẳn.",
    "helfer.offen": "chưa chắc",
    "helfer.keine": "Chưa phân công việc nào.",
    "helfer.geister": "Những người giúp thầm lặng",
    "helfer.geisterText": {
      one: "{n} người giúp chúng mình ở hậu trường trong ngày hôm đó.",
      other: "{n} người giúp chúng mình ở hậu trường trong ngày hôm đó.",
    },

    schliessen: "Đóng",
    abbrechen: "Hủy",
    "wechsel.titel": "Ai đang trả lời?",
    "wechsel.text": "Bạn có thể đổi bất cứ lúc nào – cả cho con của bạn.",
    "wechsel.andere": "Hoặc người khác",
    "wechsel.knopf": "Đổi",

    "m.gespeichert": "Đã lưu cho {name}. Cảm ơn bạn!",
    "m.fehler": "Không thành công: {text}",
    "m.leer": "Bạn chưa điền gì.",
    "m.kueche": "Chúng mình đã nhận được.",
    "m.kopiert": "Đã sao chép địa chỉ.",
    "m.kopierenFehl": "Không sao chép được – vui lòng tự bôi đen.",
    "m.keineDb": "Không kết nối được cơ sở dữ liệu: {text}",
    "m.eingetragen": "Đã đăng ký. Cảm ơn bạn!",
    "m.geaendert": "Đã thay đổi.",
    "m.raus": "Đã bỏ khỏi danh sách.",
    "m.titelFehlt": "Vui lòng ghi bạn sẽ mang món gì.",
    "m.musik": "Đã có trong danh sách.",
    "m.liedFehlt": "Vui lòng ghi tên bài hát.",

    // Leer = Karte "Übernachten" bleibt ausgeblendet.
    schlafen: "",
    abendessen:
      "18:30 có bữa tối – súp và vài món nóng. Mọi thứ đã được chuẩn bị, mọi người không cần mang gì. Ai nấu thì xem ở mục “Người giúp”.",

    ablauf: [
      [
        "Lễ đăng ký",
        "Trong phạm vi nhỏ, đến khoảng 11:30. Nếu bạn tham dự, bạn sẽ thấy ở chỗ của mình.",
      ],
      ["Đón khách", "Đến nơi, nâng ly, trò chuyện cùng nhau."],
      [
        "Buffet trưa",
        "Tất cả những món mọi người mang đến. Những gì đã có được liệt kê ở mục “Món ăn”.",
      ],
      [
        "Lớp nhảy cho mọi người",
        "Học bước cơ bản trong nửa tiếng, không cần biết nhảy trước. Chúng mình hướng dẫn, mọi người cùng nhảy – sau đó ai cũng có thể tham gia.",
      ],
      ["Bữa tối", "Súp và vài món nóng. Phần này không cần mang gì."],
      [
        "Điệu nhảy của chúng mình, rồi đến mọi người",
        "Chỉ lần này thôi chúng mình đứng ở giữa. Sau đó sàn nhảy là của mọi người.",
      ],
      ["Kết thúc", "Rồi chúng mình tắt đèn."],
    ],

    haltung: [
      [
        "Xin đừng mang quà",
        "Thật sự không cần gì cả. Việc mọi người đến với chúng mình quý hơn bất cứ món quà nào.",
      ],
      [
        "Hãy ăn mặc thật đẹp",
        "Chúng mình muốn có một ngày thanh lịch. Nhớ mang theo giày để nhảy nhé – 16:00 có lớp nhảy.",
      ],
      [
        "Không có dịch vụ tiệc – chỉ có tất cả chúng ta",
        "Buổi trưa mỗi người mang một món, và sau khi ăn thì ai cũng tự mang đĩa của mình đi cất. Như vậy chi phí vừa phải mà ai cũng no.",
      ],
      [
        "Có người trông trẻ",
        "Sẽ có một cô giáo mầm non trông các bé, để mọi người cũng có thể ngồi, ăn và nhảy thong thả.",
      ],
      [
        "Chúng mình không muốn là tâm điểm",
        "Gần như không có tiết mục nào xoay quanh chúng mình. Chúng mình chỉ mong mọi người có một ngày vui bên nhau.",
      ],
      [
        "Không chụp ảnh tạo dáng",
        "Nhiếp ảnh gia của chúng mình sẽ ghi lại những khoảnh khắc tự nhiên. Không ai phải tạo dáng – kể cả chúng mình.",
      ],
      [
        "Đám cưới lớn sẽ là năm năm nữa",
        "Khi các con lớn hơn và chúng mình có thể cùng mọi người vui chơi đến khuya. Cũng vì vậy mà 22:00 là kết thúc.",
      ],
    ],

    orteHinweise: {
      trauung: [
        "<strong>Vui lòng đến sớm mười phút.</strong> Đến 11:30 phòng sẽ được dùng tiếp.",
        "Đậu xe: ngay cạnh tòa nhà, ngoài ra còn chỗ ở Eligiusplatz (khoảng 100 m) và Peterboroughplatz.",
        "Tòa nhà hành chính II của thành phố Viersen. Có thang máy – đi xe lăn hay đẩy xe em bé đều không sao.",
        "25 chỗ ngồi. Vì vậy lễ đăng ký là phần nhỏ của ngày hôm đó.",
        "Phòng hộ tịch Viersen: <a href='tel:+492162101253'>+49 2162 101-253</a>",
      ],
      fest: [
        "<strong>Ở Süchteln, không phải Dülken.</strong> Từ nơi làm lễ đi khoảng 5 km – mất chừng 15 phút lái xe.",
        "Có chỗ đậu xe ngay tại trường dạy nhảy – không cần tìm.",
        "Đi xe buýt đến trạm Süchteln Busbahnhof. Các tuyến 067, 074 và 083 nối Dülken và Süchteln.",
        "Tiệc kéo dài đến 22:00. Nếu cần taxi, tốt nhất nên đặt trước.",
      ],
    },
  },
};
