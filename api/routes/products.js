const express = require('express')
const router = express.Router()
const multer = require('multer')
const AuthCek = require('../middleware/check-auth')
const ProductController = require('../controller/products')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
})

router.get('/', AuthCek, ProductController.product_get_all)
router.post('/', AuthCek, upload.single('productImage'), ProductController.product_post_product)
router.get('/:productId', AuthCek, ProductController.product_get_product)
router.patch('/:productId', AuthCek, ProductController.product_update_product)
router.delete('/:productId', AuthCek, ProductController.product_delete)

module.exports = router