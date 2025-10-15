const { MongoClient } = require('mongodb');


const url = '';
const client = new MongoClient(url);

async function conectarDb() {
  await client.connect();
  console.log(' Conectado ao MongoDB Atlas');
  return client.db('agenda'); 
}

module.exports = { conectarDb };
