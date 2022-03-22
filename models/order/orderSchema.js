const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userID: {type: String, required: true},
    purchase: {type: String, required: true}
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);