const express = require('express');
const tarefaRouter = require('./routes/tarefaRouter');

const app = express();


app.use(express.json());


app.use('/tarefas', tarefaRouter);


app.use((req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

module.exports = app;


if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

