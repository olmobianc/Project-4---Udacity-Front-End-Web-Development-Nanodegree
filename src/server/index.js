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

app.post('/sentimentAPI', (req, res) => {
    const url = req.query.url; // retrieves the supplied URL from formHandler
    getSentiment(url, apiKey, res)
})

const getSentiment = (url, key, res) => {
    console.log(key);
    axios.post(`https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&of=json&url=${url}&model=general&lang=en`, {})    
    .then(function (response){
        console.log(response.data);
        if(response.data.status.code != 0) {
            console.log(response.data);
            res.send(response.data);
        } else {
            console.log('there was an error');
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



