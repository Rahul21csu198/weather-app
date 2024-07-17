const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const tempInK = weatherData.main.temp;
      const tempInC = (tempInK - 273.15).toFixed(0);
      const description = weatherData.weather[0].description;
      res.write(
        `<h1>Temperature in ${query} is ${tempInC} degrees Celsius</h1>`
      );
      res.write(`<p>The weather description is ${description}</p>`);
      res.end();
    });
  });
});

app.post("/weather/coordinates", (req, res) => {
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const tempInK = weatherData.main.temp;
      const tempInC = (tempInK - 273.15).toFixed(0);
      const description = weatherData.weather[0].description;
      res.write(
        `<h1>Temperature at coordinates (${latitude}, ${longitude}) is ${tempInC} degrees Celsius</h1>`
      );
      res.write(`<p>The weather description is ${description}</p>`);
      res.end();
    });
  });
});

app.get("/weather/delhi", (req, res) => {
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const tempInK = weatherData.main.temp;
      const tempInC = (tempInK - 273.15).toFixed(0);
      const description = weatherData.weather[0].description;
      res.write(`<h1>Temperature in delhi is ${tempInC} degrees Celsius</h1>`);
      res.write(`<p>The weather description is ${description}</p>`);
      res.end();
    });
  });
});

app.post("/weather", async (req, res) => {
  try {
    console.log("Request Received")
    const lat = req.body.lat;
    const long = req.body.long;

    console.log(req.body)

    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
    console.log(url)
    const response = await axios.get(url);

    console.log(response.data);
    res.json(response.data)
  } catch (error) {
    console.log(error.message)
    res.send("Something went wrong")
  }
});

app.listen(3000, () => console.log("Our server is running at port 3000"));
