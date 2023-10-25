const express = require('express');
const router = express.Router();
const acthandler= require('../handlers/actividadeshandler')
const authHandler = require('../handlers/authhandler');
/**
 * @swagger
 * /protected:
 * /api/actividades/getallactividades:
 *   get:
 *     summary: Obtiene todas las Actividades
 *     security:
 *        - BearerAuth: []
 *     responses:
       '200':
          description: Una lista de actividades.
       '401':
          description: Usuario no autenticado.
       '500':
         description: Error en respuesta.

 */
router.get('/getallactividades', (req, res) => {
    const tokencito = req.headers['authorization'].split(' ')[1];
    console.log(authHandler.validacionInternadeUsuario(tokencito))  ;
    if(authHandler.validacionInternadeUsuario(tokencito) == null){
        return  res.status(401).json({message : "Usuario no autenticado"});
    }
    try {

        let instance = acthandler.getAllActivities();
        instance.then((data) => {
            res.status(200).json(data);
        })
            .catch((error) => {
                res.status(500).json({mensaje :`Error al obtener datos`});
            });

    }catch (error){

        res.status(500).json({mensaje :`Error al obtener datos`});
    }
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

    let resultado = acthandler.insertActividad(titulo,descripcion);
    if(resultado){
        res.status(200).json({ mensaje:`Se agregaron los valores : Titulo => ${titulo}, Descripcion: => ${descripcion}`});
    }else {
        res.status(500).json({mensaje: `Error del servidor`});
    }
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
        let result = acthandler.deleteActividad(titulo);
        if(result){
            res.status(200).json(
                {mensaje: `La actividad con titulo ${titulo}, no se elimino exitosamente`});
        }else {
            res.status(404).json(
                {mensaje: `La actividad con titulo ${titulo}, no se pudo encontrar.` }
            );
        }
    }catch (error){
        res.status(404).json(
            {mensaje: `La actividad con titulo ${titulo}, no se pudo encontrar.` }
        );
    }
});

module.exports = router;
