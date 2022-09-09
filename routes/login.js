const { Router } = require('express')
const router = Router()
const auth = require('../functions/auth')

// Guardar
router.get('/:user/:pass', auth.authorizationUserPass, (req, res, next) => {
    try {
        res.redirect('/public/privado.html')
    }
    catch (err) {
        next(err)
    }
})

module.exports = router
