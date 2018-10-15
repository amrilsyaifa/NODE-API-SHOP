const express = require('express')
const router = express.Router()

const AuthCek = require('../middleware/check-auth')
const OrderController = require('../controller/orders')

router.get('/', AuthCek, OrderController.order_get_all)
router.get('/:orderId', AuthCek, OrderController.order_get_order)
router.post('/', AuthCek, OrderController.order_post_order)
router.delete('/:orderId', AuthCek, OrderController.order_delete)

module.exports = router