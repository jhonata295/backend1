const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.get('/tarefas', (req, res) => {
    res.send("Ok")
    
});

app.get("/tarefas", (req ,res) => {
    res.json(tarefas);
});

app.post("/tarefas", (req ,res) => {
    const novatarefa = {
        id: tarefas.length + 1,
        nome: req.body.nome,
        concluida: false,
    }
    res.status(201).json(novatarefa);
})

app.get('/tarefas/:id', (req, res) => {
    res.json({});
})

module.exports = app;
