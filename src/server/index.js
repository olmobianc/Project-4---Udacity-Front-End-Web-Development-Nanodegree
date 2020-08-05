// To hide my API Keys
const dotenv = require('dotenv');
dotenv.config();

//Entrypoint for the data
let projectData = {};

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
//const fetch = require('node-fetch');

//Body-Parser
const bodyParser = require('body-parser');

//Express
const app = express()
app.use(express.static('dist'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors
const cors = require('cors');
const { request } = require('http');
app.use(cors());

console.log(__dirname)

/*
var textapi = new aylien({
    application_id: `${process.env.API_ID}`,
    application_key: `${process.env.API_KEY}`
  });
*/
const apiKey = process.env.API_KEY;
const baseURL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&url=`
let nameURL = [];

//GET request
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

const port = 8080;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});

app.post('/sentimentAPI', (req, res) => {
    const url = req.body.url;
    getSentiment(url, apiKey, (data) => {
        console.log(data);
        res.send(data);
    });
})

const getSentiment = (url, key, callback) => {
    console.log(key);
    request(`https://api.meaningcloud.com/sentiment-2.1?key=${key}&lang=en&url=${url}`, {
        json: true },
        (err, res, body) => {
        if(!err && res.status.code == 200) {
            callback(body);
        } else {
            console.log('error');
        }
    });
}

/*POST request
app.post('/sentimentAPI', async (req, res) => {
    nameURL = req.body.url;
    console.log(req.body.url);
    textapi.sentiment({
        url: `${nameURL}`
    }, function (error, response) {
        if (error === null) {
            projectData['polarity'] = response.polarity;
            projectData['subjectivity'] = response.subjectivity;
            projectData['confidence'] = response.confidence;
            projectData['irony'] = response.irony;

            res.send(projectData);
            console.log(projectData);
        } else {
            console.log("There was an error with your POST request!");
        }
    });
});

app.post('/sentimentAPI', (req, res) => {
    nameURL = req.body.url;  // retrieves the supplied URL from formHandler
    const apiRES = await fetch(baseURL+inputURL)
    .then( (apiRES) => apiRES.json())
    .then( data => {
        console.log(data.subjectivity) //log to help TS the data flow
        res.send(data) //sends api data back to the formHandler function
    }).catch((error) => 
    console.log('error', error))
});
*/



