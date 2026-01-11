function handleShowHomepage(req, res){
    return res.status(200).render('homepage', {
        user : req.user,
    })
}

function handleShowProfile(req, res){
    return res.status(200).render('profile', {
        user : req.user,
    })
}

module.exports = {
    handleShowHomepage,
    handleShowProfile,
}