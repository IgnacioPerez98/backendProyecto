const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/propuestas/GetAllPropuestas:
 *   get:
 *     summary: Get a list of products.
 *     responses:
 *       '200':
 *         description: A list of products.
 */
router.get('/GetAllPropuestas', (req, res) => {
  res.json({ products: ['Propuesta A', 'Propuesta B', 'Propuesta C'] });
});

module.exports = router;
