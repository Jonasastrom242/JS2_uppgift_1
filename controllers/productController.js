const router = require('express').Router();
const productModel = require('../models/products/productModel');
const auth = require('../authentication/auth');

router.get('/', productModel.getProducts); //get all products

router.get('/:id', productModel.getProductById);

router.post('/', auth.verifyToken, productModel.createProduct);

router.patch('/:id', auth.verifyToken, productModel.updateProduct); //om put andvänds måste hela objektet uppdateras, mongoose sköter dock så att det går att uppdatera endast ett value i objektet
router.put('/:id', auth.verifyToken, productModel.updateProduct);

router.delete('/:id', auth.verifyToken, productModel.deleteProduct);


module.exports = router;