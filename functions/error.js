
const errorLogger = (error, req, res, next) => {
    console.log( `error ${error.message}`) 
    next(error)
}
  
 const errorResponder = (error, req, res, next) => {
    res.header("Content-Type", 'application/json')
    const status = error.status || 400
    res.status(status).send(error.message)
}
  
const invalidPathHandler = (req, res, next) => {
    res.status(404)
    res.send(`Ruta "${req.originalUrl}" metodo "${req.method}" no implementada`)
}

module.exports.errorLogger = errorLogger
module.exports.errorResponder = errorResponder
module.exports.invalidPathHandler = invalidPathHandler
