const crypto = require('crypto')
let ServicioEncriptacion = {
    cifrar: function (text){
        return crypto.createHash('sha512').update(text).digest('hex');
    }
}

module.exports = ServicioEncriptacion;