require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const Order = require("./Models/Order");
const OrderStatus = require("./Models/OrderStatus");
const producerConnect = require("./producerConnect");
const app = express();
app.use(express.json({extende:false}))
connectDB();
let channel;
(async () => {
    channel = await producerConnect()
    console.log("Connected to RabbitMQ")
})()
app.post("/order/:restaurantName", async (req, res) => {
    let { name, qty, price, productId } = req.body;
    let order = new Order({
        name,
        qty,
        price,
    });
    await order.save();
    console.log(order)
    const message = `Order Successfully Placed to ${req.params.restaurantName}`;
    let orderStatus = new OrderStatus({
        order: order._id,
        status: "PROCESS",
        message,
        product: productId
    });
    await orderStatus.save();
    orderStatus = await orderStatus.populate({path: "order", select: "qty"})
    console.log(orderStatus)
    if(channel){
        channel.sendToQueue(
            process.env.QUEUE_NAME,
            Buffer.from(JSON.stringify(orderStatus))
        );
    }
    res.json(orderStatus)
});
const PORT = 8081;
app.listen(PORT, () => {
    console.log("Order Service running on port : " + PORT);
});