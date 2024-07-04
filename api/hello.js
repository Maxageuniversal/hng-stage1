const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/hello', async (req, res) => {
    try {
        const visitorName = req.query.visitor_name || 'Guest';
        let clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '127.0.0.1';

        if (clientIp.includes(',')) {
            clientIp = clientIp.split(',')[0].trim();
        }

        // Fetch location details from ipinfo.io
        const ipInfoResponse = await axios.get(`https://ipinfo.io/${clientIp}?token=1283e7f34ccd89`);
        const { city, loc } = ipInfoResponse.data;

        // Extract latitude and longitude
        const [latitude, longitude] = loc.split(',');

        // Fetch weather data from OpenWeatherMap API
        const openWeatherMapApiKey = 'e2f65da2c94ea97409a55f054a55faa9';
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapApiKey}&units=metric`);

        const temperature = weatherResponse.data.main.temp;
        const weatherDescription = weatherResponse.data.weather[0].description;

        const greeting = `Hello, ${visitorName}! It's ${weatherDescription} and ${temperature} degrees Celsius in ${city}.`;

        res.status(200).json({
            client_ip: clientIp,
            location: city,
            greeting
        });
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app;
