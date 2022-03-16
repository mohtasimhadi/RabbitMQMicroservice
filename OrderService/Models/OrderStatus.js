const mongoose = require('mongoose')

const OrderStatusSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    },
    status: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    }
})

module.exports = Order = mongoose.model('orderstatus',OrderStatusSchema)