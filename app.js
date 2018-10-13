const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true }).then(() => {
    console.log('Conected Mongodb')
}).catch(err =>{
    console.log(err)
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json())

//CORS
app.use((req, res, next) =>{
    //Allow All Origin
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

const productRouter = require('./api/routes/products')
const orderRouter = require('./api/routes/orders')

app.use('/products', productRouter)
app.use('/orders', orderRouter)

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error : {
            message: error.message
        }
    })
})
module.exports = app