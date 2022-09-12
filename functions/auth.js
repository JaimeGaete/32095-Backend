
const cfg = require('../config/configuration')

const authorization = (req, res, next) => {

    if (cfg.configuration.ADMINISTRADOR) {
        next();
    } else {
        res.status(403).send(`Ruta "${req.originalUrl}" metodo "${req.method}" no autorizada`);
    }
}

const authorizationUserPass = (req, res, next) => {

    let user = req.body.nombre
    let pass = req.body.password

    console.log("user + pass", user + " + " + pass)

    if ((cfg.configuration.USERADMIN == user) || (cfg.configuration.PASSADMIN == pass)) 
    {
        next();
    } else {
        res.status(403).send(`Ruta "${req.originalUrl}" metodo "${req.method}" no autorizada`);
    }
}

module.exports.authorization = authorization
module.exports.authorizationUserPass = authorizationUserPass
