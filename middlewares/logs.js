const fs = require('fs')

function createLogs(pathname){
    return (req, res, next) => {
        const data = `new request at ${req.path} by method ${req.method}\n`

        fs.appendFile(pathname, data, (err) => {
            // incase of any error
            if(err){
                console.log('error while appending data in logs!')
            }
        })

        next()
    }
}

module.exports = {
    createLogs,
}