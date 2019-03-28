//server.js ('npm start')

const express = require('express')
const app = express()
const port = 4000

const gulp = require('gulp')
const rev = require('gulp-rev')
const concat = require('gulp-concat')
const cssnano = require('gulp-cssnano')
const revReplace = require('gulp-rev-replace');

const baseDir = 'public'
const inputDir = 'public/css'
const outputDir = 'public/cache/'
const mainifestFilename = 'rev-manifest.json'

// minify styles.css

gulp.src([
    baseDir + '/css/styles.css'
])
    .pipe(concat('styles.css'))
    .pipe(cssnano({discardComments: {removeAll: true }}))
    .pipe(gulp.dest('public/optimized/'))

// add hash to styles.css
// gulp.src([
//     baseDir + '/optimized/*.css'
// ])
//     .pipe(rev())
//     .pipe(gulp.dest(inputDir))
//     .pipe(rev.manifest(mainifestFilename))
//     .pipe(gulp.dest(outputDir));

// Change 
// gulp.src('/views/partials/head.ejs')
//     .pipe(revReplace({
//         manifest: gulp.src(baseDir + mainifestFilename)
//     }))
//     .pipe(gulp.dest(baseDir + '/optimized'))


// set the view engine to ejs
app.set('view engine', 'ejs');

// set default directory
app.use(express.static(__dirname + '/public'));

// set cache control header for one month
// app.use((req, res, next) => {
//     res.setHeader('Cache-Control', 'max-age=' + 30 * 24 * 60 * 60);
//     next();
// })

// index page 
app.get('/', function(req, res) {
    res.render('pages/home');
});

// home page 
app.get('/home', function(req, res) {
    res.render('pages/home');
});

// results page
app.get('/results', function (req, res, next) {

    const json = require('./public/data/dolfje_books.json');

    res.render('pages/results', {
        jsonData: json
    });
});

// availability page
app.get('/availability/:frabl', function (req, res) {
    // res.send(req.params);
    const json = require('./public/data/dolfje_availability.json');

    // Data hier strippen/mappen

    res.render('pages/availability', {
        jsonData: json,
        frabl: req.params
    });
});

app.listen(port, () => console.log(`App running, listening on port ${port}!`))