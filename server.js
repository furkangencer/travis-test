const express = require('express');
const hbs = require('hbs'); // handlebars view engine for express
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Middleware oluşturuyoruz
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next(); // sonlandırdığımızı belirtiyoruz. Bunu koymazsak express başka hiçibir işlem yapamaz.
});

/*app.use((req, res, next) => {
    // Örn. site bakıma girdi. Siteye girenler bu sayfa ile karşılaşacak.
    res.render('maintenance.hbs');
    // next() koymuyoruz çünkü sitede dolaşımı engellemek için express'in ilerlememei lazım.
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
    /*res.send({
        name: 'Furkan',
        likes: [
            'travelling',
            'tv-series'
        ]
    });*/
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
        //currentYear: new Date().getFullYear()  // Bunun yerine yukarda registerHelper ile kendi fonksiyonumuzu kullandık. Tüm sayfalarda kullanabiliriz.
    })
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
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});