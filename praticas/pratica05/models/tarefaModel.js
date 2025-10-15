const tarefas = []; 

function listar() {
  return tarefas;
}

function buscarPeloId(tarefaId) {
  return tarefas.find(t => t.id === tarefaId) || null;
}

function criar(tarefa) {
  const id = Math.random().toString(36).substr(2, 4);
  const nova = {
    id,
    nome: tarefa.nome,
    concluida: tarefa.concluida
  };
  tarefas.push(nova);
  return nova;
}

function atualizar(tarefa) {
  const index = tarefas.findIndex(t => t.id === tarefa.id);
  if (index === -1) return null;
  tarefas[index] = {
    ...tarefas[index],
    nome: tarefa.nome,
    concluida: tarefa.concluida
  };
  return tarefas[index];
}

function remover(tarefaId) {
  const index = tarefas.findIndex(t => t.id === tarefaId);
  if (index === -1) return null;
  const removed = tarefas.splice(index, 1)[0];
  return removed;
}

module.exports = {
  listar,
  buscarPeloId,
  criar,
  atualizar,
  remover
};
