const express = require('express');
const Product = require('../ProductSchema');
const expressAsyncHandler = require('express-async-handler')


const ProductRoute  = express.Router();




////////////////   To get All products from DB    //////////////////////
ProductRoute.get('/getProducts' , expressAsyncHandler(async (req , res)=>{
    const Products = await Product.find();
    if(Products){
        res.send(Products)
    }
    else{
        res.status(404).send("Not Found");
    }
}))


/////////////////////// To get Product based on Slug from DB     ////////////////////////
ProductRoute.get('/getProduct/slug/:slug', expressAsyncHandler(async (req , res)=>{
    const getProduct = await Product.findOne({slug: req.params.slug})
    if(getProduct){
        res.send(getProduct)
    }
    else{
        res.status(404).send("Not Found");
    }
}))

//////////////////   To get Product based on ID from  DB    ///////////////////////

ProductRoute.get('/getProduct/id/:id' , expressAsyncHandler(async (req , res)=>{
    const getProduct = await Product.findById(req.params.id);
    if(getProduct){
        res.send(getProduct)
    }
    else{
        res.status(404).send("Not Found");
    }
}))

module.exports = ProductRoute;