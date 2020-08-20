//const request = require('request')
var axios = require("axios");
// To hide my API Keys
const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

//Express
const app = express()
app.use(express.static('dist'))

//Body-Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors
const cors = require('cors');
app.use(cors());

console.log(__dirname)

const apiKey = process.env.API_KEY;

//GET request
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

const port = 8081;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});

const request = require('request');
//POST request
app.post('/sentimentAPI', (req, res) => {
    const url = req.body.url;
    getSentiment(url, apiKey, (data) => {
        console.log(data)
        res.send(data);
    });
})

const getSentiment = (url, key, callback) => {
    request(`https://api.meaningcloud.com/sentiment-2.1?key=${key}&lang=en&url=${url}`, { 
        json: true }, 
        (err, res, body) => {
        if (!err && res.statusCode == 200) {
            callback(body);
        }   else {
            console.log(error);
        }
    });
}



