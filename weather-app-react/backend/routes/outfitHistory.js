const express = require('express');
const router = express.Router();
const pool = require('../db');
const axios = require('axios');

router.get('/:location', async (req, res) => {
  const location = req.params.location;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.WEATHER_API_KEY}`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;

    await pool.query(
      'INSERT INTO outfit_history (location, temperature, description) VALUES ($1, $2, $3)',
      [weatherData.name, weatherData.main.temp, weatherData.weather[0].description]
    );

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

module.exports = router;
