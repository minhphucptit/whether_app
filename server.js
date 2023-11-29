
let projectData = {};

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/add', (req, res) => {
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    };
    res.send(projectData);
});

const port = 8000;
const server = app.listen(port, () => {
    console.log("Server is running");
    console.log(`Running on localhost: ${port}`);
});
