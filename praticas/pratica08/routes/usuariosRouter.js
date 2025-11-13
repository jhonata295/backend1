const express = require('express');
const { gerarToken, verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Login - gera token
router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ msg: 'Usuário e senha são obrigatórios' });
  }

  const token = gerarToken({ email: usuario });
  return res.status(200).json({ token });
});

// Renovar token
router.post('/renovar', verificarToken, (req, res) => {
  const token = gerarToken({ email: req.usuario.email });
  return res.status(200).json({ token });
});

module.exports = router;
