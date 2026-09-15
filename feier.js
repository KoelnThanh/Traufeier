// =====================================================================
//  Traufeier – EURE ANGABEN. Hier und nur hier pflegen.
//
//  Hier steht nur, was in jeder Sprache gleich ist: Datum, Zeiten,
//  Adressen, Koordinaten, Kategorien. Alle Texte stehen in sprachen.js.
//
//  Die Einladung (index.html) und euer Planungsblick (planung.html)
//  lesen beide aus dieser Datei – damit ein geaendertes Datum nicht an
//  einer Stelle stimmt und an der anderen nicht.
// =====================================================================

export const FEIER = {
  // Maschinenlesbar. Treibt das Datum im Kopf (in jeder Sprache
  // richtig formatiert), den Countdown und den Kalendereintrag.
  tag: "2026-12-12",

  trauung: { von: "10:45", bis: "11:30" },
  fest: { von: "12:30", bis: "22:00" },

  // Bis wann die Gaeste antworten sollen. Danach bittet die Seite
  // nur noch darum, Aenderungen trotzdem zu melden.
  antwortBis: "2026-10-15",

  // Link zur Galerie eurer Fotografin. Steht er drin, zeigt die
  // Seite nach der Feier einen Knopf dorthin.
  fotos: null,

  // Wer den Tanzworkshop leitet – der Name genau wie in der Gaesteliste.
  // Im Ablauf steht dann "mit Amin", ein Tipp oeffnet seinen Steckbrief.
  workshop: { gast: "Amin" },

  // Wie viele Menschen ins Trauzimmer passen.
  plaetzeStandesamt: 25,

  // Unter dieser Adresse ist die Einladung erreichbar – fuer die
  // persoenlichen Links und die QR-Codes.
  adresse: "https://traufeier.nthanh.de/",
};

// Die beiden Orte. Koordinaten gegen OpenStreetMap geprueft; sie
// treiben den Routen-Knopf und den Kalendereintrag.
// 'marken' sind die Symbole vor den Hinweisen – Namen aus SYMBOLE in
// index.html. Die Texte dazu stehen in sprachen.js unter orteHinweise,
// in derselben Reihenfolge.
export const ORTE = {
  trauung: {
    kurz: "Trauzimmer Dülken",
    strasse: "Theodor-Frings-Allee 22",
    plz: "41751 Viersen-Dülken",
    lat: 51.2489191,
    lon: 6.3312341,
    marken: ["uhr", "auto", "aufzug", "plaetze", "telefon"],
  },
  fest: {
    kurz: "Tanzschule Bachata Viersen",
    strasse: "Erich-Sanders-Weg 1",
    plz: "41749 Viersen-Süchteln",
    lat: 51.2942011,
    lon: 6.3657625,
    web: "https://www.bachata-viersen.de",
    telefon: "+49 178 868 3013",
    instagram: "https://www.instagram.com/bachata.viersen/",
    // Steht ueber der Adresse. Breite/Hoehe halten den Platz frei, bevor
    // das Bild geladen ist. Bildbeschreibung: sprachen.js, "ort.bild.fest".
    bild: { datei: "saal.jpg", breite: 1024, hoehe: 765 },
    marken: ["ort", "auto", "garderobe", "bus", "nacht"],
  },
};

// Die Zeiten des Tages. Titel und Text je Punkt stehen in
// sprachen.js unter 'ablauf', in derselben Reihenfolge.
// nebensache: true stellt einen Punkt gedaempft dar,
// ort: verweist auf einen Schluessel aus ORTE und erzeugt den Link.
// sprung: "buffet" oder "abends" fuehrt direkt in den Reiter Speisen.
// leitung: zeigt "mit Amin" (FEIER.workshop), oeffnet seinen Steckbrief.
export const ABLAUF = [
  { zeit: "10:45", ort: "trauung", nebensache: true },
  { zeit: "12:30", ort: "fest" },
  { zeit: "13:30", sprung: "buffet" },
  { zeit: "16:00", leitung: true },
  { zeit: "18:30", sprung: "abends" },
  { zeit: "20:00" },
  { zeit: "22:00" },
];

// Kategorien des Mitbring-Buffets. Die Werte sind das, was in der
// Datenbank steht – sie bleiben deutsch, egal in welcher Sprache
// jemand eintraegt. Angezeigt wird die Uebersetzung aus sprachen.js.
// art: null bedeutet "Gast schreibt selbst hin, was es ist".
export const KATEGORIEN = [
  { bereich: "Mittagsbuffet", art: "herzhaft" },
  { bereich: "Mittagsbuffet", art: "Salat oder Beilage" },
  { bereich: "Mittagsbuffet", art: "Brot, Dip, Kleinigkeiten" },
  { bereich: "Mittagsbuffet", art: "süß oder Nachtisch" },
  { bereich: "Anderes", art: null },
];

// Ankreuzbar statt Freitext: so laesst sich die Liste filtern.
// Das Zutatenfeld bleibt trotzdem – kein Haken deckt "Koriander" ab.
export const ALLERGENE = [
  "Gluten",
  "Milch",
  "Ei",
  "Nüsse",
  "Erdnüsse",
  "Soja",
  "Fisch",
  "Sellerie",
  "Senf",
];

// "Passend fuer" – wird beim Eintragen unten angehakt und oben
// im Reiter zum Filter. Allergene stehen davor, die sind eine
// andere Frage: was drin ist, nicht fuer wen es passt.
export const KENNZEICHEN = [
  "vegetarisch",
  "vegan",
  "halal",
  "glutenfrei",
  "laktosefrei",
];

// =====================================================================
//  Schluessel: Supabase -> Settings -> API Keys
//  Nimm den PUBLISHABLE key (beginnt mit 'sb_publishable_'), nicht den
//  alten anon-Key aus dem Legacy-Tab – der wird Ende 2026 abgeschaltet.
//
//  Dieser Schluessel darf oeffentlich im Quelltext stehen, dafuer ist er
//  gemacht. Was er darf, regeln die Policies aus den .sql-Dateien.
//  Der SECRET key (sb_secret_...) gehoert hier NIEMALS hinein.
// =====================================================================
export const SUPABASE_URL = "https://jlwpzsdpezjxsgefbiws.supabase.co";
export const SUPABASE_KEY = "sb_publishable_HBsRUKuS-hKMz1X2rNYzQw_eD2Q1eBv";
export const BUCKET = "gaeste-fotos";
