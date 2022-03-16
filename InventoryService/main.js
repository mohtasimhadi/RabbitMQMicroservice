const connectDB = require("./config/db");
const express = require("express");
const app = express();
require("dotenv").config();
const listenForMessage = require("./listenForMessage");
const Product = require("./Model/Product");
app.use(express.json({ extende: false }));
connectDB()
listenForMessage();
app.post("/", async (req, res) => {
    let { name, availableQty, price } = req.body;
    let product = new Product({
        name,
        availableQty,
        price,
    });
    await product.save();
    res.json(product);
});

const PORT = 8082
app.listen(PORT, () => {
    console.log("Inventory Service On Port: " + PORT)
})