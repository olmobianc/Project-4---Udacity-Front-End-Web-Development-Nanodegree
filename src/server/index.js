// To hide my API Keys
const dotenv = require('dotenv');
dotenv.config();

//Entrypoint for the data
let projectData = {};

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

//Body-Parser
const bodyParser = require('body-parser');

//Express
const app = express()
app.use(express.static('dist'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors
const cors = require('cors');
app.use(cors());

console.log(__dirname)

// Require the Aylien npm package
var aylien = require("aylien_textapi");
var textapi = new AYLIENTextAPI({
    application_id: `${process.env.API_ID}`,
    application_key: `${process.env.API_KEY}`
  });

//GET request
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

//POST request
app.post('/sentimentAPI', function (request, response) {
    const nameURL = request.body.url;
    console.log(request.body.url);
    textapi.sentiment({
        url: `${nameURL}`
    }, function (error, response) {
        if (error === null) {
            projectData['polarity'] = response.polarity;
            projectData['subjectivity'] = response.subjectivity;
            projectData['confidence'] = response.confidence;
            projectData['irony'] = response.irony;

            return projectData;
        } else {
            console.log("There was an error with your POST request!");
        }
    });
    response.send(projectData);
    console.log(projectData);
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

