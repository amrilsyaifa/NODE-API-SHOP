const express = require('express')
const router = express.Router()
const Order = require('../models/orders')
const Product = require ('../models/products')

router.get('/', (req, res, next) => {
    Order.find()
    .select('productid quantity _id')
    //populate reference model orderSchema 'REF' mongoose Schema
    .populate('productid','name')
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            Orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    productid: doc.productid,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + doc._id
                    }
                }
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId
    Order.findById(id)
    .populate('productid')
    .exec()
    .then(order => {
        if (order) {
            res.status(200).json({
                order: {
                    order : order,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products'
                    }
                }
            })
        } else {
            res.status(404).json({
                order: 'No Valid Entry found for provided ID'
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.post('/', (req, res, next) => {
    Product.findById(req.body.productid)
    .then(() => {
        const newOrder = new Order(req.body)
        newOrder.save()
        .then(result => {
            res.status(200).json({
                created: {
                    _id: result._id,
                    productid: result.productid,
                    quantity: result.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + result._id
                    }
                }
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Product not found',
            error: err
        })
    })
})

router.delete('/:orderId', (req, res, next) => {
    Order.remove({ _id: req.params.orderId})
    .then((order) => {
        if (order) {
            res.status(200).json({
                delete: req.params.orderId,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products/',
                }
            })
        } else {
            res.status(404).json({
                delete: 'No Valid Entry found for provided ID'
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router