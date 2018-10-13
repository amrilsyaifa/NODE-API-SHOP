const express = require('express')
const router = express.Router()
const Product = require('../models/products')

router.get('/', (req, res, next) => {
    Product.find().exec().then(docs => {
        console.log(docs)
        if (docs.length > 0) {
            res.status(200).json({
                products: docs
            })
        } else {
            res.status(404).json({
                products: 'No Product Entry'
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.post('/', (req, res, next) => {
    const newProduct = new Product(req.body)
    newProduct.save().then((result) => {
        console.log(result)
        res.status(201).json({
            create: newProduct
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.findById(id).then(product => {
        if (product) {
            res.status(200).json({
                product: product
            })
        } else {
            res.status(404).json({
                product: 'No Valid Entry found for provided ID'
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.update({ _id : id}, req.body)
    .then((product) => {
        if (product) {
            res.status(200).json({
                update: req.body
            })
        } else {
            res.status(404).json({
                update: 'No Valid Entry found for provided ID'
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.delete('/:productId', (req, res, next) => {
    Product.remove({ _id: req.params.productId})
    .then((product) => {
        if (product) {
            res.status(200).json({
                delete: req.params.productId
            })
        } else {
            res.status(404).json({
                delete: 'No Valid Entry found for provided ID'
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router