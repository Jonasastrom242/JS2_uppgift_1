const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    //{userId: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId},
    purchase: {
        type: Array}
    
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);