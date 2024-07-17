const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example API key (replace with your actual key)
    const apiKey = '61b42f38c81d76a1bcc5aa083e391e0e';
const WEATHER_API_KEY = '';
const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather';

let storedLocation = null;

// Endpoint to set location manually
app.post('/set-location', (req, res) => {
    const { city } = req.body;

    if (!city) {
        return res.status(400).json({ error: 'City name is required.' });
    }

    storedLocation = city;
    res.json({ message: 'Location set successfully.' });
});

// Endpoint to get weather based on stored location
app.get('/weather', async (req, res) => {
    if (!storedLocation) {
        return res.status(400).json({ error: 'Location not set.' });
    }

    try {
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                q: storedLocation,
                appid: WEATHER_API_KEY,
                units: 'metric' // or 'imperial' for Fahrenheit
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${3000}`);
});