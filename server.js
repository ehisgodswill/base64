const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { writeFile } = require('fs');

app.listen(3000, () => {
    console.log('Connected on port 3000')
})

app.use(express.static(path.join(__dirname, "")));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + 'index.html'))
})
app.post('/base64toimg', (req, res) => {
    writeFile('image.png', req.body.base64.split(';base64,')[1], { encoding: 'base64' }, function (err) {
        res.sendFile(path.join(__dirname, '/image.png'))
    });
})
