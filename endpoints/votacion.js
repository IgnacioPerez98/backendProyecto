const express = require('express');
const router = express.Router();
const authHandler = require("../handlers/authhandler");
const votacionservice = require("../handlers/votacionhandler");
const votacionhandler = require('../handlers/votacionhandler');



/**
 * OpenAPI Specification for Proyecto BackEnd API
 *
 * This OpenAPI specification documents the Proyecto BackEnd API, which allows users to vote on a specific activity in a given room.
 *
 * @openapi
 * info:
 *   title: Proyecto BackEnd
 *   version: 1.0.0
 *   description: Proyecto BackEnd API for voting on activities in rooms.
 *
 * paths:
 *   /api/votacion/votar:
 *     post:
 *       summary: Vote in a room.
 *       security:
 *         - BearerAuth: [] # Requires a Bearer Token (JWT) for authentication.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombresala:
 *                   type: string
 *                 nombreactividad:
 *                   type: string
 *                 voto:
 *                   type: string
 *       responses:
 *         '200':
 *           description: A message with the current status.
 *         '401':
 *           description: Unauthorized. User is not authenticated.
 *         '500':
 *           description: Internal server error.
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.post("/votar",(req,res)=>{
    try {
        const head = req.headers['authorization'];
        const {nombresala, voto, nombreactividad} = req.body;
        if(!head){
            return  res.status(401).json({message : "Usuario no autenticado"});
        }
        let token = head.split(" ").at(1);
        let valor = authHandler.validarUsuarioconToken(token);
        if(valor.username === "anonimo"){
            res.status(403).json({message: "El usuario no cuenta con permisos suficientes"})
        }
        votacionservice.votarActividad(nombresala,nombreactividad,voto).then((data)=>{
            res.status(200).json(JSON.stringify(data));

        }).catch((error)=>{
            res.status(500).json({mensaje: `Error del servidor`, detalles: error.toString()});
        });


    }catch (e){
        res.status(500).json({mensaje: `Error del servidor`,detalles : e.toString()});
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
 *   /api/votacion/obtenervotos/{nombresala}:
 *     get:
 *       summary: Obtiene los votos de una sala determinada
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: nombresala
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Una lista de votos.
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
router.get("/obtenervotos/:nombresala", (req,res) =>{
    try{
        const head = req.headers['authorization'];
        const nombresala = req.params.nombresala;
        if(!head){
            return  res.status(401).json({message : "Usuario no autenticado"});
        }
        let token = head.split(" ").at(1);
        let valor = authHandler.validarUsuarioconToken(token);
        if(valor.username === "anonimo"){
            res.status(403).json({message: "El usuario no cuenta con permisos suficientes"})
        }
        let votos =  votacionhandler.obtenerVotosporSala(nombresala);
        if(votos === null){
            res.status(500).json({mensaje: `Error del servidor`});
        }
        else{
            res.status(200).json(votos);
        }
    }catch(e){
        res.status(500).json({mensaje: `Error del servidor`,detalles : e.toString()});
    }
})

module.exports = router;