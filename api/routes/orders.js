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

router.post('/:orderID', (req, res, next) => {
    res.status(200).json({
        message: "Post /orders/:orderID",
        rderID : req.params.orderId
    })
})

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: "Get /orders/:orderId",
        rderID : req.params.orderId
    })
})

module.exports = router