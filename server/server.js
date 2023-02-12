const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = require('./router/index');
const cors = require('cors');
const session = require('express-session');
const app = express();

if (process.env.ENVIRONMENT === 'dev') {
  app.use(require('morgan')('dev'));
  app.use(require('response-time')());
} else {
  app.use(require('helmet')());
}

app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    secret: 'secretToken', // TODO refactor to env
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

app.use(express.json());
app.use(cors({ allowedHeaders: '*', origin: '*' }));

app.use('/api/', router);

module.exports = app;
