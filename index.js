const express = require('express')

const app = express()
const port = 8000

app.get('/', (req, res) => {
    return res.end('Hello from server!')
})

app.listen(port, () => console.log(`server is listening at port ${port}`))