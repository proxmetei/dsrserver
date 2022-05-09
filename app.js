const express = require("express");
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const app = express();
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const fileUpload = require('express-fileupload');

app.use(require('morgan')('dev'));
app.use(require('cors')());
app.use(express.json())
app.use(fileUpload({}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(errorHandler);

app.use('/api/user', authRoutes);

module.exports = app;