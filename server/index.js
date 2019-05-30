const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.post("/", function(req, res){
    res.send('welcome, ' + req.body.phone)
});

app.listen(3000, () => console.log("server up and running on http://localhost:3000"));