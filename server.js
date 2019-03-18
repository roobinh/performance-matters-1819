const express = require('express')
const app = express()
const port = 4000

// set the view engine to ejs
app.set('view engine', 'ejs');

// set default directory
app.use(express.static('public'));

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



app.listen(port, () => console.log(`Example app listening on port ${port}!`))