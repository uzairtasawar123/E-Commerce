const express = require("express");
const User = require("../UserSchema");
const bcrypt = require("bcryptjs");
const { response } = require("express");
const OrderRoute = express.Router();
 const Auth = require("../jwt");
const expressAsyncHandler = require('express-async-handler')
const Order = require("../OrderSchema");

//////////////////////////////////////////   Adding Order Details in DB   //////////////////////////
OrderRoute.post("/order", Auth , expressAsyncHandler(async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user._id,
  });

  const order = await newOrder.save();
  res.status(201).send({ message: "New Order Created", order });
}));

//////////////////////////////////    Order History   ///////////////////////////////

OrderRoute.get(
  "/orders/my",
  Auth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    if(orders){
      res.send(orders);
    }
    else{
      res.send("Not Found");
    }
  })
);

///////////////////////    Getting Order from DB    /////////////////////////////
OrderRoute.get("/orders/:id", expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  //console.log(order);
  if (order) {
    res.status(200).send({message:"Order History" , order});
  } else {
    res.status(404).send({ message: "Order not found" });
  }
}));

module.exports = OrderRoute;
