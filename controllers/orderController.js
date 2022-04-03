const router = require('express').Router();
const orderModel = require('../models/orders/orderModel');
const auth = require('../authentication/auth');

router.post('/', auth.verifyToken, orderModel.createOrder);
router.get('/', auth.verifyToken, orderModel.getOrder);
router.patch('/:id', auth.verifyToken, orderModel.updateOrder); //om put andvänds måste hela objektet uppdateras, mongoose sköter dock så att det går att uppdatera endast ett value i objektet
router.put('/:id', auth.verifyToken, orderModel.updateOrder);

router.delete('/:id', auth.verifyToken, orderModel.deleteOrder);

module.exports = router;