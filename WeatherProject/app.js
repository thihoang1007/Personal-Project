const express = require("express");
const https = require('node:https');


const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html");    
});

app.post('/',function (req, res) {
    const query = req.body.cityName;
    // const apiKey = {"key";}
    const units = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+apiKey+"&mode=json&units=" + units; 
    
    https.get( url, function (response) {
    console.log(response.statusCode); 
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in "+ query +" is " + temp + " degrre Fahrenheit</h1>");
            res.write("<p>"+description+"</p>");
            res.write("<img src=" + imageUrl +">");
            res.send();
        });
    });
});

app.listen(port, function () {
    console.log("running on port " + port);
});