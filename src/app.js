const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
//to use html present in public
//__dirname will take me upto the web-server folder
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
let name = 'Sahil'


//set up handlebars engine and views location(default is in views folder)
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// app.set('views',any path so that i dont have to make folder name view)


//set up static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        'title': 'Weather App',
        'name': name
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About',
        'name': name
    })
});
app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'Help',
        'name': name,
        'helpText': 'this is helpful page'
    });
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            'error': 'you must provide an address term',
        });
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error });
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            });

        });
    });
});
app.get('/products', (req, res) => {
    //req.query provides us all the key value pair written in url after ?
    if (!req.query.search) {
        return res.send({
            'error': 'you must provide a search term'
        });
    }
    console.log(req.query);
    res.send({
        'products': []
    });
});

app.get('/help/*', (req, res) => {
    res.render('errorHandler', {
        'errorMessage': 'Help article not Found',
        'name': name,
        'title': '404'
    });
});
app.get('*', (req, res) => {
    res.render('errorHandler', {
        'errorMessage': 'Page not Found',
        'name': name,
        'title': '404'
    });
});

app.listen(port, () => {
    console.log("server is started");
});