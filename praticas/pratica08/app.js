const express = require('express');
require('dotenv').config();

const usuariosRouter = require('./routes/usuariosRouter');
const produtosRouter = require('./routes/produtosRouter');

const app = express();
app.use(express.json());

app.use('/usuarios', usuariosRouter);
app.use('/produtos', produtosRouter);

module.exports = app;

