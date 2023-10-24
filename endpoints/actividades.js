const express = require('express');
const router = express.Router();
const acthandler= require('../handlers/actividadeshandler')
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
    let instance = acthandler.getAllActivities();
    instance.then((data) => {
        // Handle the data here
        console.log(data);
        res.json(data);
    })
        .catch((error) => {
            // Handle errors here
            console.error(error);
        });
});


// Define a route to handle the POST request to save an activity
/**
 * @swagger
 * /api/actividades/CrearActividad:
 *   post:
 *     summary: crea una nueva actividad
 *     description: Crea un actividad con titulo y descripción;
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Activity saved successfully
 *       500:
 *         description: Error saving the activity
 */
router.post('/CrearActividad', (req, res) => {
    const { titulo, descripcion } = req.body;

    acthandler.insertActividad(titulo,descripcion);

    res.json({ mensaje:`Se agregaron los valores : Titulo => ${titulo}, Descripcion: => ${descripcion}`});
});

module.exports = router;
