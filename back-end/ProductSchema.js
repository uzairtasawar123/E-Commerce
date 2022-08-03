const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
     Name:{
          type: String,
          required:true,
          unique:true
        },
        slug:{
            type: String,
            required:true,
            unique:true
          },
          category:{
            type: String,
            required:true,
            
          },
          img:{
            type: String,
            required:true,
            
          },
          description:{
            type: String,
            required:true,
            
          },
          price:{
            type:Number,
            required:true
          },
          brand:{
            type: String,
            required:true,
            
          },
          number_reviews:{
            type: String,
          
          },
          Rating:{
            type: Number,
            required:true,
            
          },
          available_total:{
            type: Number,
            required:true,
          },

    },
    {
        timestamps:true
    }
)

const Product = new mongoose.model('Product', ProductSchema)
module.exports = Product;