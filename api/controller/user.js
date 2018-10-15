const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.user_signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'mail exist'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash
                        })
                        user.save()
                            .then(result => {
                                return res.status(201).json({
                                    message: 'User Created'
                                })
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            })
        })
}

exports.user_login = (req, res, next) => {
    const JWT_KEY = 'secret'
    User.find({ email: req.body.email })
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth Failed'
                })
            }
            else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth Failed'
                        })
                    }
                    if (result) {
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        }, JWT_KEY, {
                                expiresIn: '1h'
                            })
                        return res.status(200).json({
                            message: 'Login Success',
                            token: token
                        })
                    }
                    else {
                        return res.status(401).json({
                            message: 'Auth Failed'
                        })
                    }
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            })
        })
}