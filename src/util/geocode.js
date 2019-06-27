const request = require('request');
const geocode = (address, callback) => {

    setTimeout(() => {
        const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYWFsb2tyMTMiLCJhIjoiY2p4YmZtanRuMDRiaTNucGM2aTlscWQ3eSJ9.8GYcSY58UH9Zj6ObF0nymQ&limit=1';
        request({ url: geoURL, json: true }, (error, { body }) => {
            // const geocode = features[0].geometry;
            if (error) {
                callback('Unable to connection Location Services', undefined);
            } else if (body.features.length === 0) {
                callback('Unable to find location , Try another location', undefined);
            } else {
                callback(undefined, {
                    latitude: body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    location: body.features[0].place_name

                });
            }
        });
    }, 2000);

}

const getWeather = (lat, long, callback) => {
    const weatherURL = 'https://api.darksky.net/forecast/cde15fbde03cc7cafd934c0c80f4d052/' + lat + ',' + long + '?units=si&lang=es'
        //callback(undefined, weatherURL);
    request({ url: weatherURL, json: true }, (error, response) => {
        if (error) {
            callback('Uneable to connect weather services!', undefined);
        } else {
            const current = body.daily.data;
            callback(undefined, current);
        }
    });

}

module.exports = geocode;