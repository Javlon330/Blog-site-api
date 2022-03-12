const express = require('express')
const dotenv = require('dotenv')
const app = express()
const mongoose = require('mongoose');
dotenv.config()
app.use(express.json())

mongoose.connect(process.env.MONGO_URL);

app.get('/', (req, res) => {
    res.json("This is blog-site")
})

const port = process.env.PORT || 5050

app.listen(port, () => {
    console.log(`Server listening port - ${port}`)
})