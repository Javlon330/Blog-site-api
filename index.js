const express = require('express')
const dotenv = require('dotenv')
const app = express()
const mongoose = require('mongoose');
const morgan = require('morgan')
const multer = require('multer')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
dotenv.config()

app.use(express.json())
app.use(morgan('tiny'))

mongoose.connect(process.env.MONGO_URL_LOCAL)
    .then(() => {
        console.log('Connect MongoDB')
    })
    .catch((err) => {
        console.log(err)
    })

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, "nature1.jpg")
    }
})
const upload = multer({storage:storage});
app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded")
})

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/categories', categoryRoute)

const port = process.env.PORT || 5050

app.listen(port, () => {
    console.log(`Server listening port - ${port}`)
})