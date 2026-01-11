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

    return res.status(201).render('homepage', {
        user : createdUser,
    })
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
        res.cookie(token)

        const loggedinUser = verifyToken(token)

        return res.status(200).render('homepage', {
            user : loggedinUser,
        })
    }
    catch(err){
        return res.status(401).end(err.message)
    }
} 

module.exports = {
    handleShowSignupPage,
    handleSignupValidation,
    handleShowLoginPage,
    handleValidateLogin,
}