const {MongoClient} = require('mongodb');

const url = "";

const cliente = new MongoClient(url);

async function conectar() {
    try{
        await cliente.connect();
        console.log("Conectado")
        return cliente.db("agenda");
    } catch (e) {
        console.log("Erro ao conectar no MongoDB", e.message)
    }
}

module.exports = conectar;