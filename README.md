# Performance Matters @cmda-minor-web · 2018-2019

## Inhoudsopgave
* [1. Inleiding](#1)
* [2. Installatie](#2)
  + 2.1 NPM Scripts
* [3. Optimalizaties](#3)
  + 3.1 Server Side Rendering
  + 3.2 Minified CSS
  + 3.3 Caching css
  + 3.4 Custom Local Font
  + 3.5 Image Filesize
  + 3.6 Meta Tag
  + 3.7 First View
* [4. Service Worker](#4)
* [5. Conclusie](#5)

## 1. Inleiding
Voor het vak perfomance matters ga ik mijn OBA applicatie herbouwen van client-side rendering naar server side rendering. Dit heeft meerdere voordelen, zoals het renderen van je webpagina zonder javascript. Naast dat gaan we verschillende optimalizaties toepassen, die de performance van de site drasitsch verbeteren.

**In dit document ga je zien hoe de performance van de site van:**
<img src="https://i.ibb.co/61BDtcV/image.png">

**Naar:**
<img src="https://i.ibb.co/ky1qRhC/image.png">

**Is gegaan!**


## 2. Installatie
Locally clone het project
```
git clone https://github.com/roobinh/performance-matters-1819
```

Installeer de modules
```
cd [your_path_here]/performance-matters-1819/assignment
npm install
npm build
```

Tot slot, start de server
```
npm start
```

### 2.1 NPM Scripts
```json
"scripts": {
    "start": "node server.js",
    "dev-start": "nodemon server.js"
  }
```
- npm start -> Start the server
- npm dev-start -> Start server in developer mode (with nodemon) to automatically reload server on change

## 3. Optimalizaties
In dit hoofdstuk ga ik alle optimalizaties bij langs, inclusief de invloed op de run-/loadtime. Loadtime zonder optimalizaties:

*Alle tests zijn gedaan met een download/uploadsnelheid van 50kbps voor nauwkeurige tests*

### 3.1 Server Side Rendering
De webpagina wordt momenteel server side gerendered d.m.v. node.js. Dit zorgt ervoor dat alle client-side javascript niet geladen hoeft te worden om de webpagina te renderen. Ook zorgt dit ervoor dat de webpagina ook werkt zonder javascript.

### 3.2 Minified CSS
Momenteel wordt de css geminified d.m.v. gulp. Vervogens wordt er een hash code aan de minified CSS toegevoegd, om caching mogelijk te maken. 

originele css file size: 3,93Kb
optimized css file size: 2.07Kb

Dit wordt gedaan door de onderstaande code.

```javascript
// minify styles.css and save to '/optimized/styles.css'
gulp.src([
    baseDir + '/css/styles.css'
])
    .pipe(concat('styles.css'))
    .pipe(cssnano({discardComments: {removeAll: true }}))
    .pipe(gulp.dest('public/optimized/'))

// add hash to styles.css
gulp.src([
    baseDir + '/optimized/styles.css'
])
    .pipe(rev())
    .pipe(gulp.dest(inputDir))
    .pipe(rev.manifest(mainifestFilename))
    .pipe(gulp.dest(outputDir));
```
### 3.3 Caching/Repeat View
Door middel van de onderstaande code wordt CSS, Javascript, afbeeldingen en de font gecached. Dit zorgt ervoor dat dit geen tweede keer geladen hoeft te worden (repeat view). Dit maakt de loadtime van de pagina bijna instant.

```javascript
// set maxAge to 1 day
var options = {
    maxAge: '1d'
}
app.use(express.static(__dirname + '/public', options));
```

### 3.4 Custom Local Font
In plaats van het laden van de google font via de google API, wordt de font lokaal vanaf de server ingeladen. Dit zorgt ervoor dat de font ook gecached wordt (ook is er een fallback font). Dit wordt gedaan door de onderstaande code:

```css
@font-face {
    font-family: 'Inconsolata'; src: url(../fonts/Inconsolata-Regular.ttf);
    font-family: sans-serif;
}
```

### 3.5 Image Filesize
Er worden op mijn website 2 soorten images gebruikt:

**1. OBA Logo**

Het OBA Logo was origineel (als jpeg) 169Kb. Dit heb ik aangepast door er twee verschillende bestanden van te maken:
- OBA_Logo_large.webp (40,7 Kb)
- OBA_Logo_small.webp (31,9 Kb)

De schermgrootte bepaald uiteindelijk welke van de twee afbeeldingen wordt ingeladen. Dit wordt gedaan door middel van de volgende code:
```html
<img class="logo" alt="oba_logo" src="/img/oba_logo_small.webp" 
srcset="/img/oba_logo_large.webp 1000w, /img/oba_logo_small.webp 300w"
sizes="(max-width: 1000px) 1000px, (max-width: 300px) 300px, 1000px">
```

**2. Book Covers**

Na het zoeken kom je op de overzicht pagina, hier staan alle boeken die overeenkomen met jouw zoekopdracht. Bij deze boeken hoort een cover. De image size van de cover kan je aanpassen in de header.

```
https://cover.biblion.nl/coverlist.dll?doctype=morebutton&bibliotheek=oba&style=0&ppn=270066586&isbn=9789066921863&lid=&aut=&ti=&size=70 <---- Hier
```

Omdat de default op 70 staat, heb ik deze op 70 gelaten. Afbeeldingen zijn nu duidelijk te zien en prima filesize.

### 3.6 Meta Tag
De onderstaande code heeft geen invloed op de performance, maar wel om zeker te weten dat de juiste viewports gebruikt worden.
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 4. Service Worker
Ik maak op mijn website gebruik van een service worker. Deze wordt gebruikt om toch de home-pagina te renderen ZONDER internet. Dit wordt gedaan door middel van de volgende code:

```javascript
'use strict'

var cacheVersion = 1
var currentCache = {
    offline: 'offline-cache' + cacheVersion
}
var offlineUrls = [ '/', '/home', '/results', '/results?', '/offline'];

self.addEventListener('install', (event) => {
    console.log("service worker: install...", event);

    event.waitUntil(
        caches.open(currentCache.offline)
            .then(function(cache) {
                return cache.addAll(offlineUrls);
            })
    );
});

self.addEventListener('activate', (event) => {
    console.log("service worker: activate...", event)
});

self.addEventListener('fetch', (event) => {
    console.log("service worker: fetch...", event.request.url)
    
    event.respondWith(
        fetch(event.request).catch(error => {
            console.log('Fetch failed; returning offline page instead.', error);
            return caches.match('/offline');
        }        
    ))
});

function isHtmlGetRequest(request) {
    if(request.method == "GET") {
        console.log("is get request...")
        return true;
    }
    return false;
}
```

## 5. Conclusie
Al met al was het zeer leerzaam om te leren hoe je precies dezelfde pagina veel sneller kan laden door middel van de genoemde technieken.

Bedankt voor het lezen!


## 6. Grading
Voor nu nog geen voldoende (cijfer: 5)
Onderstaande dingen fixen voor voldoende:

- Service worker moet ook CSS en JavaScript cachen, ook moet de frontpagina weergeven dat je offline bent.
- Font moet eerst fallback, dan font inladen (zodat je al wel iets hebt)
- Site moet op heroku runnen
