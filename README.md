# Pizza Holzminden

Vite-Projekt für die Website von Pizza Holzminden.

## Entwicklung

```bash
npm install
npm run dev
```

## Produktion

```bash
npm run build
npm run preview
```

Die optimierten Bilder liegen in `public/images/`. Der Build landet in `dist/`.

## Plesk / Produktionsserver

Dies ist eine statische Vite-Website. Das Repository-Verzeichnis ist **nicht**
das öffentliche Web-Verzeichnis. Es wird kein Node-Anwendungsserver benötigt.

1. Den vollständigen Branch `main` nach `httpdocs` deployen. Insbesondere müssen
   `src/App.js`, beide CSS-Dateien, `menu-data.json`, `public/` und die
   `package*.json`-Dateien vorhanden sein. Linux unterscheidet Groß-/Kleinschreibung:
   der Dateiname lautet exakt `src/App.js`.
2. Im Projektverzeichnis `npm ci && npm run build` ausführen.
3. In den Hosting-Einstellungen der Domain den Dokumentenstamm auf
   `httpdocs/dist` setzen. Nicht den Repository-Quellordner ausliefern.
4. Bei zukünftigen Git-Deployments den Build erneut ausführen. `dist/` ist
   absichtlich nicht in Git enthalten und wird auf dem Server erzeugt.

Alternativ lokal bauen und den **gesamten Inhalt** von `dist/` in ein separates
öffentliches Verzeichnis hochladen. Dazu gehören `index.html`, `assets/`,
 `images/` und `favicon.svg`.

### Fehler erkennen

- `Failed to resolve /src/App.js`: Der Checkout auf dem Server ist unvollständig
  oder veraltet. Vollständigen aktuellen Branch deployen und Schreibweise prüfen.
  Die Datei ist versioniert; ein anderer Vite-Basispfad ersetzt sie nicht.
- Bilder nur unter `/public/images/` erreichbar: Der Server liefert den
  Quellordner statt `dist/` aus.
- Die ausgelieferte HTML-Datei muss auf gebaute Dateien unter `/assets/`
  verweisen, nicht auf `/src/App.js` oder `/src/style.css`.
- Nach erfolgreichem Deployment müssen `/images/hero.jpg`, `/images/logo.png`
  und `/favicon.svg` mit HTTP 200 erreichbar sein.
