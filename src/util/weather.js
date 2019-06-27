const request = require('request');
//const chalk = require('chalk');
const getWeather = (lat, long, callback) => {
    const weatherURL = 'https://api.darksky.net/forecast/cde15fbde03cc7cafd934c0c80f4d052/' + lat + ',' + long + '?units=si&lang=es'
        //callback(undefined, weatherURL);
    request({ url: weatherURL, json: true }, (error, { body }) => {
        if (error) {
            callback('Uneable to connect weather services!', undefined);
        } else {
            const current = body.currently;
            callback(undefined, current.summary + '.It is currently ' + current.temparature + ' there is a ' + current.precipProbability + ' % chance of rain.');
        }
    });

}

module.exports = getWeather;