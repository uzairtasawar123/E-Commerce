const express = require('express');
const Product = require('../ProductSchema');
const data = require('../Data');
const User = require('../UserSchema');
const { response } = require('express');

const route1  = express.Router();



route1.get('/setProducts' , async (req , res)=>{

        //////////    Creating Product in DB
     const CreateProducts = await Product.insertMany(data.products);
     if(CreateProducts){
        res.send(CreateProducts)
     }
     else{
          res.send("Not Found")
     }
             //////////    Creating User in DB
     const CreateUser = await User.insertMany(data.Users);
     if(CreateUser) {
     res.send(CreateProducts);
     }
     else{
        res.send("Not Found");
     }
});

module.exports = route1;
