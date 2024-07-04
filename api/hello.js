const express = require('express');
const app = express();

app.get('/api/hello', (req, res) => {
    try {
        const visitorName = req.query.visitor_name || 'Guest';
        let clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '127.0.0.1';

        if (clientIp.includes(',')) {
            clientIp = clientIp.split(',')[0].trim();
        }

        const location = 'New York'; // Hardcoded location for demonstration
        const greeting = `Hello, ${visitorName}! The temperature is 11 degrees Celsius in ${location}.`;

        res.status(200).json({
            client_ip: clientIp,
            location,
            greeting
        });
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app;
