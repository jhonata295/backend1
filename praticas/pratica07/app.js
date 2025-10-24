require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const produtosRouter = require('./routes/produtosRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
).then(() => {
  console.log('Conectado ao MongoDB Atlas!');
}).catch((error) => {
  console.error('Erro ao conectar no MongoDB:', error.message);
});


app.use('/produtos', produtosRouter);


app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;

