const express = require('express')
const app = express()
const port = 4000

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

//http://localhost:4000/home
app.get('/home', function (req, res) {
    res.send('Dit is de homepage');
})

//http://localhost:4000/users/654
app.get('/users/:userID', function (req, res) {
    res.send(req.params);
})

app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))