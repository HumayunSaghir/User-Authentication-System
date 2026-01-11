const {Router} = require('express')
const {handleShowSignupPage, handleSignupValidation, handleShowLoginPage, handleValidateLogin, handleLogoutFunctionality} = require('../controllers/users')

const router = Router()

// setting up routes
router.get('/signup', handleShowSignupPage)
router.post('/validateSignup', handleSignupValidation)
router.get('/login', handleShowLoginPage)
router.post('/validateLogin', handleValidateLogin)
router.get('/logout', handleLogoutFunctionality)

module.exports = router