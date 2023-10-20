const express = require('express');
const router = express.Router();
const { connectToDatabase } = require("../servicios/ServicioMongoDB")
/**
 * @swagger
 * /api/actividades/GetAllActividades:
 *   get:
 *     summary: Obtiene todas las Actividades preguardadas en la base de datos MongoDB
 *     responses:
 *       '200':
 *         description: Una lista de actividades.
 */
router.get('/GetAllActividades', (req, res) => {
    res.json({ products: ['Product A', 'Product B', 'Product C'] });
});

module.exports = router;
