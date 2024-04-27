var path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();


const app = express()

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('dist'))
//app.use(express.static('src/client'))


console.log(__dirname)

//variable for url and api key
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?' 
const apiKey = process.env.API_KEY

app.get('/', function (req, res) {
     res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})


// POST Route

app.post('/api', async (req, res) => {
    const userInput = req.body.url;
    console.log(`You entered: ${userInput}`);
    const apiUrl = `${baseURL}key=${apiKey}&url=${userInput}&lang=en`;
    try {
        const response = await fetch(apiUrl);
        const responseData = await response.json();
        console.log(responseData);
        res.send(responseData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});



// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})


