const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const JWT_KEY = 'secret'
        const token = req.headers.authorization.split(" ")[1]
        const decode = jwt.verify(token, JWT_KEY)
        req.userData = decode
        next()
    }
    catch (error) {
        return res.status(401).json({
            message: 'Auth Failed'
        })
    }
}