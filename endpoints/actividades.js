const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/actividades/GetAllActividades:
 *   get:
 *     summary: Get a list of products.
 *     responses:
 *       '200':
 *         description: A list of products.
 */
router.get('/GetAllActividades', (req, res) => {
  res.json({ products: ['Product A', 'Product B', 'Product C'] });
});

module.exports = router;
