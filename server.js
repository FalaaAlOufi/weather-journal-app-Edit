// Server Side, if I have console.log the output show in Terminal.
// Do most of code from lesson
// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
/* Dependencies, Handle a POST request */
const bodyParser = require('body-parser');
// Cors for cross origin allowance
const cors = require('cors'); 

/** Listen Port */
const port = 8080;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
/* This line of code connects our server-side code (the code in the 'server.js' file) 
   to our client-side code (the browser code written in the files housed in the 'website' folder). */
app.use(express.static('website'));


// Setup Server
app.listen(port, () => {
    console.log(`\tServer Running \nRunning On: http://localhost:${port}`);
});

/* GET route, Get All Data By The: http://localhost:8080/getAllData
* "request" from the client to the server.
* "response" from the server to the client.
*/
app.get('/getAllData', (request, response) => {
   response.send(projectData);
});

/**
 * POST route, Post Data By The: http://localhost:8080/postAllData
 * "request" from the client to the server.
 * "response" from the server to the client.
 */
app.post('/postAllData', (request, response) => {
    //Post Data Now
    // Test
    // console.log(request.body);
    projectData = request.body;
    response.send(projectData);
});