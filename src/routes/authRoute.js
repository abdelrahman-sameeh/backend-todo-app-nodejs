const bodyParser = require('body-parser')
const {  postSignup,  postLogin, logout } = require('../controllers/authController')
const { notAuth, isAuth } = require('./guards/authGuard')
const router = require('express').Router()

router.post('/signup', notAuth, bodyParser.urlencoded({ extended: false }), postSignup)

router.post('/login', notAuth, bodyParser.urlencoded({ extended: false }), postLogin)

router.post('/logout',isAuth, bodyParser.urlencoded({ extended: false }), logout)

module.exports = router