const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Testes de autenticação JWT', () => {
  let token;

  it('GET /produtos sem token deve retornar 401', async () => {
    const res = await request.get('/produtos');
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe('Não autorizado');
  });

  it('GET /produtos com token inválido deve retornar 401', async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', 'Bearer 123456789');
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe('Token inválido');
  });

  it('POST /usuarios/login deve retornar 200 e token', async () => {
    const res = await request
      .post('/usuarios/login')
      .send({ usuario: 'email@exemplo.com', senha: 'abcd1234' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('GET /produtos com token válido deve retornar 200', async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it('POST /usuarios/renovar deve retornar novo token', async () => {
    const res = await request
      .post('/usuarios/renovar')
      .set('authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('GET /produtos com novo token deve retornar 200', async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
