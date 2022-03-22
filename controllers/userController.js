const router = require('express').Router();
const userModel = require('../models/users/userModel');
const auth = require('../authentication/auth');

router.post('/register', userModel.registerUser); //regga ny användare

router.post('/login', userModel.loginUserWithEmailAndPassword); //login användare


module.exports = router;
