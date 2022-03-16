const consumerConnect = require("./consumerConnect");
const Product = require("./Model/Product");

const listenForMessage = async () => {
    const channel = await consumerConnect();
    console.log("Connected to RabbitMQ");
    channel.consume(process.env.QUEUE_NAME, async (m) => {
        let orderStatus = JSON.parse(m.content.toString());
        console.log(orderStatus)
        channel.ack(m)
        let product = await Product.findById(orderStatus.product);
        if (!product) {
            console.log("Product Id Not available");
        } else {
            if (orderStatus.order.qty <= product.availableQty) {
                console.log("Quantitity Avaliable");
            } else {
                console.log("Quantity Not Available");
            }
        }
    });
};

module.exports = listenForMessage;