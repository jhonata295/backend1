const request = require('supertest');
const app = require('../app');

describe('API /tarefas - testes', () => {
  let createdId;

  test('GET /tarefas -> 200 e JSON (array)', async () => {
    const res = await request(app).get('/tarefas');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /tarefas -> 201 e JSON com id', async () => {
    const payload = { nome: 'Estudar Node', concluida: false };
    const res = await request(app).post('/tarefas').send(payload);
    expect(res.status).toBe(201);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  test('GET /tarefas/:id -> 200 e JSON', async () => {
    const res = await request(app).get(`/tarefas/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('id', createdId);
  });

  test('GET /tarefas/1 -> 404 e JSON', async () => {
    const res = await request(app).get('/tarefas/1');
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Tarefa não encontrada');
  });

  test('PUT /tarefas/:id -> 200 e JSON', async () => {
    const payload = { nome: 'Estudar Node e Express', concluida: true };
    const res = await request(app).put(`/tarefas/${createdId}`).send(payload);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('id', createdId);
    expect(res.body).toHaveProperty('nome', payload.nome);
    expect(res.body).toHaveProperty('concluida', payload.concluida);
  });

  test('PUT /tarefas/1 -> 404 e JSON', async () => {
    const res = await request(app).put('/tarefas/1').send({ nome: 'x', concluida: false });
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Tarefa não encontrada');
  });

  test('DELETE /tarefas/:id -> 204 sem conteúdo', async () => {
    const res = await request(app).delete(`/tarefas/${createdId}`);
    expect(res.status).toBe(204);
    expect(res.text).toBe(''); 
  });

  test('DELETE /tarefas/1 -> 404 e JSON', async () => {
    const res = await request(app).delete('/tarefas/1');
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Tarefa não encontrada');
  });
});
