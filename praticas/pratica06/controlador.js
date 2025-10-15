const { Tarefa } = require('./modelo');

async function adicionarTarefa(nome) {
  const tarefa = new Tarefa(nome, false);
  await tarefa.init();
  await tarefa.inserir();
}

async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.buscar();
  return tarefa;
}

async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.buscar();
  if (tarefa.id) {
    tarefa.concluida = concluida === 'true' || concluida === true;
    await tarefa.alterar();
  }
}

async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.buscar();
  if (tarefa.id) {
    await tarefa.deletar();
  }
}

module.exports = {
  adicionarTarefa,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa
};
