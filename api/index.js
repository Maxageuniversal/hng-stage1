const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the API. Use /api/hello?visitor_name=Mark to get a greeting.');
});

module.exports = app;
