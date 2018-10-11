const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling get request to /products"
    })
})

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling post request to /products"
    })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    if ( id === 'special') {
        res.status(200).json({
            message: "Your Special id",
            id: id
        })
    } else {
        res.status(200).json({
            message: " Your ID"
        })
    }
})

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "Patch /products/:productID",
    })
})

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "Patch /products/:productID",
    })
})

module.exports = router