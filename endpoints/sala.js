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
 *           description: Una sala.
 *         '500':
 *           description: Error en respuesta
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.get("/obtenersala/:nombresala", (req,res)=>{
    try {
        /*Controlo el token de validacion */
        const head = req.headers['authorization'];
        if(!head){
            return  res.status(401).json({message : "Usuario no autenticado"});
        }
        let token = head.split(" ").at(1);
        let valor = authHandler.validarUsuarioconToken(token);
        if(valor.username === null){
            res.status(403).json({message: "El usuario no proporciono un token."})
        }
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
 *       summary: Crea la sala y devuelve un objeto de una sala (nombre, link, isOpen)
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
 *                          actividadesSeleccionadas:
 *                              type: array
 *                              items:
 *                                  type: integer
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
router.post("/crearsala", async (req, res) => {
    try {
        const { nombresala, actividadesSeleccionadas } = req.body;

        // Controlo el token de validación
        const head = req.headers['authorization'];
        if (!head) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        const token = head.split(" ").at(1);
        const valor = authHandler.validarUsuarioconToken(token);
        if (valor.username === "anonimo") {
            return res.status(403).json({ message: "El usuario no cuenta con permisos suficientes" });
        }

        const data = await servicioSala.crearSalaConActividadesSeleccionadas(nombresala, actividadesSeleccionadas);
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error del servidor", detalles: error.toString() });
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
});
/**
 * @openapi
 * info:
 *   title: Proyecto BackEnd
 *   version: 1.0.0
 *   description: Proyecto BackEnd
 *
 * paths:
 *   /api/sala/obtenervotos/{nombresala}:
 *     get:
 *       summary: Obtiene los votos de las actividades dado el nombre de una sala.
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
 *           description: Votos de las actividades.
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
router.get("/obtenervotos/:nombresala", async (req, res) => {
    try {
        const nombreSala = req.params.nombresala;

        // Controlo el token de validación
        const head = req.headers['authorization'];
        if (!head) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        const token = head.split(" ").at(1);
        const valor = authHandler.validarUsuarioconToken(token);
        if (valor.username !== "anonimo" && valor.username !== "admin") {
            return res.status(401).json({ message: "No autorizado para ver los resultados" });
        }

        const votos = await salaHandler.obtenerVotosPorSala(nombreSala);
        res.status(200).json(votos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error del servidor", detalles: error.toString() });
    }
});


module.exports = router;