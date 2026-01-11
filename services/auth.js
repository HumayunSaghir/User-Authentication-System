const JWT = require('jsonwebtoken')
const secretKey = '$hroud3296'

// creating and returning token.
function createToken(user){

    const payLoad = {
        _id : user._id,
        name : user.name,
        email : user.email,
    }

    const token = JWT.sign(payLoad, secretKey)
    return token
}

function verifyToken(token){
    const user = JWT.verify(token, secretKey)
    return user
}

module.exports = {
    createToken,
    verifyToken,
}