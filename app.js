const express = require('express');
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
//const db = require("./util/database")
const transactionRoutes = require('./routes/transaction');


const app = express()


//app.use(bodyparser.urlencoded())
app.use(bodyparser.json())

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
app.use('/transaction', transactionRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message
    const data = error.data;
    res.status(status).json({ message: message, data: data })

})

mongoose.connect(
    'mongodb+srv://Praveen:Praveen@cluster0.1affwyf.mongodb.net/?retryWrites=true&w=majority'
    , { useNewUrlParser: true })
    .then(result => {
        app.listen(8090)
    })
    .catch(err => console.log(err))




