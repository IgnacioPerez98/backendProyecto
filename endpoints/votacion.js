const express = require('express');
const router = express.Router();
const authHandler = require("../handlers/authhandler");
const votacionservice = require("../handlers/votacionhandler");



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
        authHandler.validacionInternadeUsuario(token).then(
            (data) =>{
                if(data === null){
                    return  res.status(401).json({message : "Usuario no autenticado"});
                }
            }
        ).catch((e)=>{
            console.log(e);
        })
        votacionservice.votarActividad(nombresala,nombreactividad,voto).then((data)=>{
            res.status(200).json(JSON.stringify(data));

        }).catch((error)=>{
            res.status(500).json({mensaje: `Error del servidor`, detalles: error.toString()});
        });


    }catch (e){
        res.status(500).json({mensaje: `Error del servidor`});
    }
})

module.exports = router;