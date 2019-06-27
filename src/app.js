const path = require('path');
const express = require('express');
const hbs = require("hbs");
const geocode = require('./util/geocode');
const forecast = require('./util/weather');
//console.log(hbs);
const app = express();
//console.log(__dirname);
//console.log(path.join(__dirname, 'public'));
const publicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
console.log(viewPath);

app.set('view engine', 'hbs'); //extension of views
app.set('views', viewPath); //for specific template hbs extension files for viewing purpose
hbs.registerPartials(partialsPath);
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', { "heading": "Home Page", "name": "Aalok Shrivastava", "profession": "Web Developer" });
});

app.get('/about', (req, res) => {
    res.render('about', { "heading": "About page", "name": "Aalok Shrivastava", "profession": "Web Developer" });
});

app.get('/help', (req, res) => {
    res.render('help', { "heading": "Help Page", "helpmsg": "This message represents helping natures" });
});



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({ error: "Adress parameter not set" });
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                res.send({ error: error });
                //  return console.log('Error ', error);
            }
            //console.log(data);
            forecast(latitude, longitude, (error, forcastdata) => {
                if (error) {
                    res.send({ error: error });
                    //  return console.log('Error ', error);
                }

                res.send({ location: location, forecastdata: forcastdata });
                //console.log(location);
                // console.log(forcastdata);
            });
        });
    }

});

app.get('/products', (req, res) => {
    console.log(req.query);
    res.send({ product: [] });
});

app.get('/help/*', (req, res) => {
    res.render('404', { "heading": "Articles Page", "error": "Articles not  found" });
});



app.get('*', (req, res) => {
    res.render('404', { "heading": "404 Page", "error": "404 error page not found !" });
});

app.listen(3000, () => {
    console.log('port started working');
});