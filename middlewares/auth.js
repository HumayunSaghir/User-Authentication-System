const {verifyToken} = require('../services/auth')

function softAuth(req, res, next){

    // getting the cookie value
    const token = req.cookies['token']

    // incase user is not logged in.
    if(!token){
        req.user = undefined
        return next()
    }

    // incase user is logged in.
    const user = verifyToken(token)

    // attaching user object with req object
    req.user = user
    next()
}

module.exports = {
    softAuth,
}