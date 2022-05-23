const express = require("express");
const bodyParser = require('body-parser');
const authRoutes = require('./routes/user');
const animalRoutes = require('./routes/animal');
const adminRoutes = require('./routes/admin');
const app = express();
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const fileUpload = require('express-fileupload');

app.use(require('morgan')('dev'));
app.use(require('cors')());
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(express.json())
app.use(fileUpload({}));

// app.use(bodyParser.urlencoded({
//     limit: '50mb',
//     parameterLimit: 100000,
//     extended: true 
//   }));
app.use(errorHandler);

app.use('/api/user', authRoutes);
app.use('/api/animal', animalRoutes);
app.use('/api/admin', adminRoutes);
module.exports = app;