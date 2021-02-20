const request = require('request');
const geocode = (address, callback) => {
    const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FoaWxzcyIsImEiOiJja2t1MGU5ODAwdG15Mm5wYjRxbnlheXRyIn0.VXTc3iyfSSV5-N2BJsP3aQ&limit=1';
    request({ url: geourl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined);
        } else if (response.body.features.length == 0) {
            callback('Unable to find the location!', undefined);
        } else {
            const data = response.body;
            let latitude = data.features[0].center[1];
            let longitude = data.features[0].center[0];
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: response.body.features[0].place_name
            });
        }
    });
}
module.exports = geocode;