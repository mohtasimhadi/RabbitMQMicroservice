const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = Order = mongoose.model('order',OrderSchema)