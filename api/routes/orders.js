const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Get /orders"
    })
})

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "Get /orders/:orderId",
        orderID : req.params.orderId
    })
})

router.post('/', (req, res, next) => {
    const order = {
        productid : req.params.productid,
        quantity : req.body.quantity
    }
    res.status(201).json({
        message: "Post /orders/",
        order : order
    })
})

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "Delete /orders/:orderId",
        orderID : req.params.orderId
    })
})

module.exports = router