const express = require('express')
const dotenv = require('dotenv')
const app = express()
const mongoose = require('mongoose');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
dotenv.config()
app.use(express.json())

mongoose.connect(process.env.MONGO_URL_LOCAL)
    .then(() => {
        console.log('Connect MongoDB')
    })
    .catch((err) => {
        console.log(err)
    })

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)

const port = process.env.PORT || 5050

app.listen(port, () => {
    console.log(`Server listening port - ${port}`)
})