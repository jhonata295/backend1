const request = require('supertest');
const app = require('../app');

describe('Testes da API /produtos', () => {
  let id;

  it('POST /produtos → deve criar um produto', async () => {
    const res = await request(app)
      .post('/produtos')
      .send({ nome: 'Laranja', preco: 10.0 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.nome).toBe('Laranja');
    expect(res.body.preco).toBe(10.0);
    id = res.body._id;
  });

  it('POST /produtos → sem JSON', async () => {
    const res = await request(app).post('/produtos');
    expect(res.statusCode).toEqual(422);
    expect(res.body.msg).toBe('Nome e preço do produto são obrigatórios');
  });

  it('GET /produtos → deve listar', async () => {
    const res = await request(app).get('/produtos');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /produtos/:id → deve retornar produto', async () => {
    const res = await request(app).get(`/produtos/${id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('nome');
    expect(res.body).toHaveProperty('preco');
  });
});
