const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const query = req.body.CityName;
    const apikey = "Api Key";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units="+ unit +"&appid="+ apikey +"";
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const iconImg = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>The Weather is Currently " + desc + "<img src="+iconImg+">" + "</h1>");
            res.write("<h2>The temperature in "+query+" is " + temp + " Degree Celcius</h2>");
            res.send()
        })
    })
})

app.listen(3000, function(){
    console.log("sever is running on port 3000");
})