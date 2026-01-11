const userModel = require('../models/users')
const {createToken} = require('../services/auth')

// show signup page
function handleShowSignupPage(req, res){
    return res.render('signup')
}

// validating signup
async function handleSignupValidation(req, res){
    const {name, email, password} = req.body
    
    const createdUser = await userModel.create({
        name : name,
        email : email,
        password : password,
    }) // before saving our hook will run automatically!

    // sending token to the client
    const token = createToken(createdUser)
    res.cookie('token', token)

    return res.end('you are logged in!')
}

// showing login page
function handleShowLoginPage(req, res){
    return res.render('login')
}

// validating login
async function handleValidateLogin(req, res){
    const {email, password} = req.body
    let token;

    try{
        token = await userModel.matchPassword(email, password)
        res.cookie(token)
        return res.end('logged in!')
    }
    catch(err){
        return res.end(err.message)
    }
} 

module.exports = {
    handleShowSignupPage,
    handleSignupValidation,
    handleShowLoginPage,
    handleValidateLogin,
}