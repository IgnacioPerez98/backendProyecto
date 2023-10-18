const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene una lista de usuarios.
 *     responses:
 *       '200':
 *         description: Respuesta exitosa.
 */
router.get('/users', (req, res) => {
  res.json({ message: 'Obteniendo lista de usuarios' });
});

module.exports = router;
