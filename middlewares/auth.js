const {verifyToken} = require('../services/auth')

function softAuth(req, res, next){
    console.log('entered the softauth middleware.')

    // getting the cookie value
    const token = req.cookies['token']

    // incase user is not logged in.
    if(!token){
        req.user = undefined
        console.log('user not attached with the req object!')
        return next()
    }

    // incase user is logged in.
    const user = verifyToken(token)

    // attaching user object with req object
    req.user = user
    console.log('user attached with the req object.')
    next()
}

module.exports = {
    softAuth,
}