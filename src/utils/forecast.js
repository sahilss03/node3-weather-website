const request = require('request');
const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a611858251f067a0293f3a85cf44d23f&query=' + lat + ',' + long;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined);
        } else if (response.body.error) {
            callback('Unable to find the location!', undefined);
        } else {
            const data = response.body;
            callback(undefined, `${data.current.weather_descriptions[0]} , currently it is ${data.current.temperature} degree but it feels like ${data.current.feelslike}`);
        }
    });
}
module.exports = forecast;