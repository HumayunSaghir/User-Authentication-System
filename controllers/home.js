function handleShowHomepage(req, res){
    return res.status(200).render('homepage', {
        user : req.user,
    })
}

module.exports = {
    handleShowHomepage,
}