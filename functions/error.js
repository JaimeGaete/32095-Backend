
export const errorLogger = (error, req, res, next) => {
    console.log( `error ${error.message}`) 
    next(error)
}
  
export const errorResponder = (error, req, res, next) => {
    res.header("Content-Type", 'application/json')
    const status = error.status || 400
    res.status(status).send(error.message)
}
  
export const invalidPathHandler = (req, res, next) => {
    res.status(404)
    res.send(`Ruta "${req.originalUrl}" metodo "${req.method}" no implementada`)
}

