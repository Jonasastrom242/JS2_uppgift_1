const express = require('express');
const app = express();
const cors = require('cors');
const productController = require('./controllers/productController.js');
const userController = require('./controllers/userController.js');

//MIDDLEWARE - FÖR ATT LÄSA JSON 
app.use(cors());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//CONTROLLERS

app.use('/api/products', productController); //anger sökväg på server
app.use('/api/users', userController); 
module.exports = app