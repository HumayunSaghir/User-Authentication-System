const express = require('express')
const userRouter = require('./routes/users')
const {connectDatabase} = require('./connection')
const path = require('path')
const {createLogs} = require('./middlewares/logs')
const cookieParser = require('cookie-parser')

// setting up app
const app = express()
const port = 8000

// database connection
connectDatabase('mongodb://127.0.0.1:27017/userAuthSystem')
    .then(() => console.log('database connected!'))
    .catch(() => console.log('error in database connection!'))

// utility middlewares
app.use(express.urlencoded({extended : false}))
app.use(createLogs('./logs.txt'))
app.use(cookieParser())

// setting up templating engine
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

// setting up routes
app.use('/user/', userRouter)

// server listening
app.listen(port, () => console.log(`server is listening at port ${port}`))