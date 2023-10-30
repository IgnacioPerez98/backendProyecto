const express = require('express');
const router = express.Router();
const acthandler= require('../handlers/actividadeshandler')
const authHandler = require('../handlers/authhandler');

/**
 * @openapi
 * info:
 *   title: Proyecto BackEnd
 *   version: 1.0.0
 *   description: Proyecto BackEnd
 *
 * paths:
 *   /api/actividades/getallactividades:
 *     get:
 *       summary: Obtiene todas las Actividades
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         '200':
 *           description: Una lista de actividades.
 *         '401':
 *           description: Usuario no autenticado.
 *         '500':
 *           description: Error en respuesta
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.get('/getallactividades', (req, res) => {
    try {
        const head = req.headers['authorization'];
        if(!head){
            return  res.status(401).json({message : "Usuario no autenticado"});
        }
        let token = head.split(" ").at(1);
        authHandler.validacionInternadeUsuario(token).then(
            (data) =>{
                if(data === null){
                    return  res.status(401).json({message : "Usuario no autenticado"});
                }
                if(data.username === 'anonimo'){
                    return res.status(403).json({message:"Usuario sin permisos"})
                }
            }
        ).catch((e)=>{
            console.log(e);
        })
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
 * @openapi
 * info:
 *   title: Proyecto BackEnd
 *   version: 1.0.0
 *   description: Proyecto BackEnd
 *
 * /api/actividades/crearactividad:
 *   post:
 *     summary: crea una nueva actividad
 *     security:
 *         - BearerAuth: []
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
 *       401:
 *         description: Usuario no autentificado
 *       403:
 *         description: Usuario sin permisos.
 *       500:
 *         description: Error saving the activity
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.post('/crearactividad', (req, res) => {
    try {
        const head = req.headers['authorization'];
        if(!head){
            return  res.status(401).json({message : "Usuario no autenticado"});
        }
        let token = head.split(" ").at(1);
        authHandler.validacionInternadeUsuario(token).then(
            (data) =>{
                if(data === null){
                    return  res.status(401).json({message : "Usuario no autenticado"});
                }
                if(data.username === 'anonimo'){
                    return res.status(403).json({message:"Usuario sin permisos"})
                }
            }
        ).catch((e)=>{
            console.log(e);
        })
        const { titulo, descripcion } = req.body;

        let resultado = acthandler.insertActividad(titulo,descripcion);
        if(resultado){
            res.status(200).json({ mensaje:`Se agregaron los valores : Titulo => ${titulo}, Descripcion: => ${descripcion}`});
        }else {
            res.status(500).json({mensaje: `Error del servidor`});
        }

    }catch (e){
        res.status(500).json({message: "Error del servidor", detalles : e.toString()})
    }
});

/**
 * @openapi
 * info:
 *   title: Proyecto BackEnd
 *   version: 1.0.0
 *   description: Proyecto BackEnd
 *
 * /api/actividades/elimininaractividad:
 *   delete:
 *     summary: Elimina una actividad
 *     security:
 *         - BearerAuth: []
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
 *       401:
 *         description: Usuario no autentificado
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Actividad no encontrada
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.delete('/elimininaractividad', (req, res) => {
    try {
        const head = req.headers['authorization'];
        if(!head){
            return  res.status(401).json({message : "Usuario no autenticado"});
        }
        let token = head.split(" ").at(1);
        authHandler.validacionInternadeUsuario(token).then(
            (data) =>{
                if(data === null){
                    return  res.status(401).json({message : "Usuario no autenticado"});
                }
                if(data.username === 'anonimo'){
                    return res.status(403).json({message:"Usuario sin permisos"})
                }
            }
        ).catch((e)=>{
            console.log(e);
        })
        const { titulo }  = req.body;
        let result = acthandler.deleteActividad(titulo);
        if(result){
            res.status(200).json(
                {mensaje: `La actividad con titulo ${titulo}, se elimino exitosamente`});
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
