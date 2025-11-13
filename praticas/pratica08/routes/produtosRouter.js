const express = require('express');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader)
    return res.status(401).json({ msg: 'Não autorizado' });

  try {
    verificarToken(req, res, () => {
      return res.status(200).json([]);
    });
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
});

module.exports = router;
