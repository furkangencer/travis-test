const express = require('express');
const hbs = require('hbs'); // handlebars view engine for express
const fs = require('fs');

const port = process.env.PORT || 3000; // If process.env.PORT doesn't exist, set port equal to 3000
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next(); // If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
});

/*app.use((req, res, next) => {
    // Maintaenance Mode On //
    res.render('maintenance.hbs');
});*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (req, res) => {
    //res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
        /*likes: [
            'travelling',
            'hiking'
        ]*/
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});