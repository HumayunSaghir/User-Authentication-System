const {Router} = require('express')
const {handleShowHomepage, handleShowProfile} = require('../controllers/home')

const router = Router()

router.get('/home', handleShowHomepage)
router.get('/profile', handleShowProfile)

module.exports = router