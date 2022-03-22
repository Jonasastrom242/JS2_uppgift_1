const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: {type: String, required: true},
    purchase: {
        product: String, 
        quantity: Number}
    
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);