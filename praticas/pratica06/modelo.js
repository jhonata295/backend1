const { conectarDb } = require('./database');
const { ObjectId } = require('mongodb');

class Tarefa {
  constructor(nome, concluida = false) {
    this.id = null;
    this.nome = nome;
    this.concluida = concluida;
    this.db = null;
    this.collection = null;
  }

  async init() {
    this.db = await conectarDb();
    this.collection = this.db.collection('tarefas');
  }

  async inserir() {
    const resultado = await this.collection.insertOne({
      nome: this.nome,
      concluida: this.concluida
    });
    this.id = resultado.insertedId;
    console.log(' Tarefa inserida com sucesso!');
  }

  async alterar() {
    if (!this.id) {
      console.log(' Tarefa precisa ser buscada antes de alterar.');
      return;
    }
    await this.collection.updateOne(
      { _id: this.id },
      { $set: { nome: this.nome, concluida: this.concluida } }
    );
    console.log(' Tarefa atualizada com sucesso!');
  }

  async deletar() {
    await this.collection.deleteOne({ nome: this.nome });
    console.log(' Tarefa removida com sucesso!');
  }

  async buscar() {
    const resultado = await this.collection.findOne({ nome: this.nome });
    if (resultado) {
      this.id = resultado._id;
      this.nome = resultado.nome;
      this.concluida = resultado.concluida;
      console.log(' Tarefa encontrada:', resultado);
    } else {
      console.log(' Tarefa não encontrada.');
    }
  }
}

module.exports = { Tarefa };
