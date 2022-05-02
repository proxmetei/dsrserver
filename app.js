const express = require("express");
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const { Client } = require('pg')
const app = express();

const client = new Client()
client.connect().then(()=>{
    console.log("PG connected!")
})
.catch(error => console.log(error));
app.use(require('morgan')('dev'));
app.use(require('cors')());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

module.exports = app;