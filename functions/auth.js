
const cfg = require('../config/configuration')

const authorization = (req, res, next) => {
    if (cfg.configuration.ADMINISTRADOR) {
        next();
    } else {
        res.status(403).send(`Ruta "${req.originalUrl}" metodo "${req.method}" no autorizada`);
    }
}


module.exports.authorization = authorization