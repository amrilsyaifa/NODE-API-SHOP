const Product = require('../models/products')

exports.product_get_all = (req, res, next) => {
    Product.find()
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            if (docs.length > 0) {
                const response = {
                    count: docs.length,
                    product: docs.map(doc => {
                        return {
                            name: doc.name,
                            price: doc.price,
                            _id: doc._id,
                            productImage: doc.productImage,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/products/' + doc._id
                            }
                        }
                    })
                }
                res.status(200).json(response)
            } else {
                res.status(404).json({
                    products: 'No Product Entry'
                })
            }
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.product_post_product = (req, res, next) => {
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    })
    newProduct.save().then((result) => {
        res.status(201).json({
            created: {
                name: result.name,
                price: result.price,
                _id: result._id,
                productImage: result.productImage,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + result._id
                }
            }
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

exports.product_get_product = (req, res, next) => {
    const id = req.params.productId
    Product.findById(id)
        .select('name price _id productImage')
        .exec()
        .then(product => {
            if (product) {
                res.status(200).json({
                    product: {
                        product: product,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products'
                        }
                    }
                })
            } else {
                res.status(404).json({
                    product: 'No Valid Entry found for provided ID'
                })
            }
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.product_update_product = (req, res, next) => {
    const id = req.params.productId
    Product.update({ _id: id }, req.body)
        .then((product) => {
            if (product) {
                res.status(200).json({
                    update: {
                        update: req.body,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + id
                        }
                    }
                })
            } else {
                res.status(404).json({
                    update: 'No Valid Entry found for provided ID'
                })
            }
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.product_delete = (req, res, next) => {
    Product.remove({ _id: req.params.productId })
        .then((product) => {
            if (product) {
                res.status(200).json({
                    delete: req.params.productId,
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
}