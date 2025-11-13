const express = require('express');
const path = require('path');
const logger = require('morgan');

const apidocsRouter = require('./routes/apidocsRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rota da documentação Swagger
app.use('/api-docs', apidocsRouter);

// Exporta app
module.exports = app;
