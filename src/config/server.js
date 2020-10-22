const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { PORT } = require('./keys');

const app = express();

//settings
app.set('port', PORT);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use(require('../routes/auth.routes'));
app.use(require('../routes/user.routes'));
app.use(require('../routes/admin.routes'));

module.exports = app;
