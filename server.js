const express = require('express')
const app = express()
const port = 4000

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

// index page 
app.get('/', function(req, res) {
    res.render('pages/home');
});

// home page 
app.get('/home', function(req, res) {
    res.render('pages/home');
});

// results page
app.get('/results', function (req, res) {
    res.render('pages/results');
})

// availability page
app.get('/availability/:frabl', function (req, res) {
    // res.send(req.params);
    res.render('pages/availability');
})

app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))