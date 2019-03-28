# Performance Matters @cmda-minor-web · 2018-2019

## Table of contents
1. Inleiding
2. Installatie
3. Stappenplan

## 1. Inleiding
Voor het vak perfomance matters gaan we onze OBA applicatie herbouwen van client-side renderen naar server side rendering. Dit heeft meerdere voordelen, zoals het renderen van je webpagina zonder javascript.


## 2. Installatie
Clone het project door de volgende command:
```
git clone https://github.com/roobinh/performance-matters-1819
```

Installeer daarna de modules door de volgende commands:
```
cd [your_path_here]/performance-matters-1819/assignment
npm install
npm build
```

Tot slot, start de server
```
npm start
```

## 3. Stappenplan
- [x] OBA app server side runnen met Node.js en Express
- Routing geimplementeerd
- JSON data ingeladen, nog niet verwerkt
- [x] Duidelijke installatie in readme.md
- [ ] JSON data renderen
- [ ] Tooling implementeren 
- Door middel van NPM Scripts (momenteel alleen npm start)
- [ ] (optioneel) OBA API in applicatie verwerken


Inhoud readme.md:
    -Inleiding
    -Installatie
    -NPM scripts
    -Optimalisaties + Invloed 
        -Server side rendering (gulp, nodejs, express)
        -Minifying css
        -Caching css
        -Custom Local font
        -Image filesize (srcset)
        -Meta tag
    -Service worker
    -Conclusie
    