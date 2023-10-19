const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/jugadores/GetAllJugadores:
 *   get:
 *     summary: Get a list of products.
 *     responses:
 *       '200':
 *         description: A list of products.
 */
router.get('/GetAllJugadores', (req, res) => {
  res.json({ products: ['Product A', 'Product B', 'Product C'] });
});

module.exports = router;