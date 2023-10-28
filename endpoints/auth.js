const express = require("express");
const router = express.Router();
const serviciohash = require('../servicios/SHA512')
const jwt = require('jsonwebtoken');
const ServicioAuth = require('../handlers/authhandler');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

/**
 * @swagger
 * /api/auth/gettoken:
 *   post:
 *     summary: Obtiene el token
 *     description: Obtiene el token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               typerole:
 *                  enum: [usuario, administrador]
 *     responses:
 *       200:
 *         description: Token generado
 *       403:
 *         description: Usuario o contraseña incorrecta
 *       500:
 *         description: Error del servidor
 */
router.post('/gettoken', (req, res) => {
    try{
        const { username, password, typerole } = req.body;
        ServicioAuth.validarUsuario(username).then(
            (data) =>{
                const { usuario, contrasena, rol} = data;
                const pass = contrasena.contrasena;
                if(username === usuario && serviciohash.cifrar(password) === pass && typerole === rol ){
                    const token = jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
                    res.json({ token });
                }else {
                    res.status(403).json({ message: 'Authentication failed, revise usuario, contraseña y tipo de rol.' });
                }

            }
        ).catch( (error)=>{
            console.log("Error: ",error);
            res.status(403).json({ message: 'Authentication failed' });
        })
    }catch (e){

        res.status(500).json({ message: 'Error de servidor' });
    }
});

/**
 * @swagger
 * /api/auth/validartoken:
 *   post:
 *     summary: Valida el token
 *     description: Valida el token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token correcto
 *       403:
 *         description: Token incorrecta
 *       500:
 *         description: Error del servidor
 */
router.post('/validartoken', (req, res) => {

    const {token} = req.body;

    try {
        ServicioAuth.validarUsuarioconToken(token).then(
            (data) => {
                res.status(200).json(data);
            }
        ).catch((err) =>{
           res.status(403).json(err);
        });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
});


module.exports = router;