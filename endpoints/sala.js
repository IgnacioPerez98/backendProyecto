const express = require('express');
const router = express.Router();
const servicioSala = require('../handlers/salahandler');
const authHandler = require("../handlers/authhandler");

/**
 * @openapi
 * info:
 *   title: Proyecto BackEnd
 *   version: 1.0.0
 *   description: Proyecto BackEnd
 *
 * paths:
 *   /api/sala/obtenersala/{nombresala}:
 *     get:
 *       summary: Obtiene la conexion a una sala
 *       parameters:
 *         - in: path
 *           name: nombresala
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Una sala.
 *         '500':
 *           description: Error en respuesta
 */
router.get("/obtenersala/:nombresala", (req,res)=>{
    try {
        const nameSala = req.params.nombresala;
        servicioSala.conectarasala(nameSala).then(
            (data)=>{
                res.status(200).json(data);
            }
        ).catch((error)=>{
            res.status(500).json({message:"Error al intentar conectar a la sala. Verifique que esta existe"});
        })
    }catch (error){
        res.status(500).json({message:"Error del servidor"});
    }
})

/**
 * @openapi
 * info:
 *   title: Proyecto BackEnd
 *   version: 1.0.0
 *   description: Proyecto BackEnd
 *
 * paths:
 *   /api/sala/crearsala:
 *     post:
 *       summary: Crea la sala y devuelve un objeto de una sala (nombre, link, actividades, isOpen)
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nombresala:
 *                              type: string
 *       responses:
 *         '200':
 *           description: Una sala.
 *         '401':
 *           description: Usuario no autenticado.
 *         '403':
 *           description: Usuario sin permisos.
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
router.post("/crearsala", (req,res)=>{
    try {
        const {nombresala}= req.body;
        /*Controlo el token de validacion */
        const head = req.headers['authorization'];
        if(!head){
            return  res.status(401).json({message : "Usuario no autenticado"});
        }
        let token = head.split(" ").at(1);
        let valor = authHandler.validarUsuarioconToken(token);
        if(valor.username === "anonimo"){
            res.status(403).json({message: "El usuario no cuenta con permisos suficientes"})
        }
       servicioSala.crearSalaTodasLasActividades(nombresala).then(
           (data)=>{
               res.status(200).json(data);
           }
       ).catch((error)=>{
           return res.status(500).json({mensaje : "Error del servidor.",detalles:error.toString()});
       });
    }catch (e){
        return res.status(500).json({mensaje : "Error del servidor.", detalles : e.toString()});
    }
})
/**
 * @openapi
 * info:
 *   title: Proyecto BackEnd
 *   version: 1.0.0
 *   description: Proyecto BackEnd
 *
 * paths:
 *   /api/sala/cambiarestadosala:
 *     post:
 *       summary: Cambia el estado de una sala a travez del nombre
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          estado:
 *                              type: boolean
 *                          nombresala:
 *                              type: string
 *       responses:
 *         '200':
 *           description: Un message con el estado.
 *         '401':
 *           description: Usuario no autenticado.
 *         '403':
 *           description: Usuario sin permisos.
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
router.post("/cambiarestadosala", (req, res)=>{
   try {
       /*Controlo el token de validacion */
       const head = req.headers['authorization'];
       const {estado, nombresala} = req.body;
       if(!head){
           return  res.status(401).json({message : "Usuario no autenticado"});
       }
       let token = head.split(" ").at(1);
       let valor = authHandler.validarUsuarioconToken(token);
       if(valor.username === "anonimo"){
           res.status(403).json({message: "El usuario no cuenta con permisos suficientes"})
       }
       servicioSala.estadoSala(estado,nombresala).then(
           (data) =>{
               res.status(200).json(data);
           }
       ).catch((error)=>{
           res.status(500).json({message:"Error del servidor"});
       })

   } catch (e){
       res.status(500).json({message:"Error del servidor", detalles : e.toString()});
   }
});

/**
 * @openapi
 * info:
 *   title: Proyecto BackEnd
 *   version: 1.0.0
 *   description: Proyecto BackEnd
 *
 * paths:
 *   /api/sala/eliminarsala:
 *     delete:
 *       summary: Elimina una sala con el nombre
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nombresala:
 *                              type: string
 *       responses:
 *         '200':
 *           description: Un message con el estado.
 *         '401':
 *           description: Usuario no autenticado.
 *         '403':
 *           description: Usuario sin permisos.
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
router.delete("/eliminarsala",(req,res)=>{
    try {
        /*Controlo el token de validacion */
        const head = req.headers['authorization'];
        const {nombresala} = req.body;
        if(!head){
            return  res.status(401).json({message : "Usuario no autenticado"});
        }
        let token = head.split(" ").at(1);
        let valor = authHandler.validarUsuarioconToken(token);
        if(valor.username === "anonimo"){
            res.status(403).json({message: "El usuario no cuenta con permisos suficientes"})
        }

        servicioSala.eliminarSala(nombresala).then( (data)=>{
            res.status(200).json(data);
        }).catch((e)=>{
            res.status(500).json({message:"Error del servidor", detalles:e.toString()});
        })

    }catch (e){
        res.status(500).json({message:"Error del servidor", detalles : e.toString()});
    }
})


module.exports = router;