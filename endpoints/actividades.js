const express = require('express');
const router = express.Router();
const acthandler= require('../handlers/actividadeshandler')
/**
 * @swagger
 * /api/actividades/getallactividades:
 *   get:
 *     summary: Obtiene todas las Actividades
 *     responses:
 *       '200':
 *         description: Una lista de actividades.
 *       '500':
 *         description: Error en respuesta.
 *
 */
router.get('/getallactividades', (req, res) => {
    let instance = acthandler.getAllActivities();
    instance.then((data) => {
        res.status(200).json(data);
    })
        .catch((error) => {
            res.status(500).json({mensaje :`Error al obtener datos`});
        });
});


/**
 * @swagger
 * /api/actividades/crearactividad:
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
router.post('/crearactividad', (req, res) => {
    const { titulo, descripcion } = req.body;

    acthandler.insertActividad(titulo,descripcion);

    res.json({ mensaje:`Se agregaron los valores : Titulo => ${titulo}, Descripcion: => ${descripcion}`});
});

/**
 * @swagger
 * /api/actividades/elimininaractividad:
 *   delete:
 *     summary: Elimina una actividad
 *     description: Elimina una actividad a partir del titulo;
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Actividad eliminada correctamente
 *       404:
 *         description: Actividad no encontrada
 */
router.delete('/elimininaractividad', (req, res) => {
    const { titulo }  = req.body;
    try {
        acthandler.deleteActividad(titulo);
        res.status(200).json(
            {mensaje: `La actividad con titulo ${titulo}, no se pudo encontrarse elimino exitosamente`});
    }catch (error){
        res.status(404).json(
            {mensaje: `La actividad con titulo ${titulo}, no se pudo encontrar.` }
        );
    }
});

module.exports = router;
