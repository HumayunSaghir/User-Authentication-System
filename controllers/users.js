const userModel = require('../models/users')
const {createToken, verifyToken} = require('../services/auth')

// show signup page
function handleShowSignupPage(req, res){
    return res.status(200).render('signup')
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

    return res.status(201).redirect('/home')
}

// showing login page
function handleShowLoginPage(req, res){
    return res.status(200).render('login')
}

// validating login
async function handleValidateLogin(req, res){
    const {email, password} = req.body
    let token;

    try{
        token = await userModel.matchPassword(email, password)
        
        // sending token to client
        res.cookie('token', token)

        return res.status(200).redirect('/home')
    }
    catch(err){
        return res.status(401).render('login', {
            message : err.message,
        })
    }
} 

// logout
function handleLogoutFunctionality(req, res){
    return res.status(200).clearCookie('token').redirect('/home')
}

module.exports = {
    handleShowSignupPage,
    handleSignupValidation,
    handleShowLoginPage,
    handleValidateLogin,
    handleLogoutFunctionality
}