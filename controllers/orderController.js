const router = require('express').Router();
const orderModel = require('../models/order/orderModel');
const auth = require('../authentication/auth');

router.post('/order:id', auth.verifyToken, orderModel.createOrder);
router.get('/order:id', auth.verifyToken, orderModel.getOrder);
router.patch('/order/:id', auth.verifyToken, orderModel.updateOrder); //om put andvänds måste hela objektet uppdateras, mongoose sköter dock så att det går att uppdatera endast ett value i objektet
router.put('/order/:id', auth.verifyToken, orderModel.updateOrder) 

router.delete('/order/:id', auth.verifyToken, orderModel.deleteOrder)

module.exports = router;