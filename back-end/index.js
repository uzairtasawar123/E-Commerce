const { json } = require('express');
const express  = require('express')
const data = require('./Data.js')
const app = express();
const cors = require('cors')
const port =  process.env.PORT || 8001
const dotenv = require('dotenv')
const mongoose =  require('mongoose');
const route1 = require('./Routes/Route1.js');
const userRoute  = require('./Routes/UserRoute')
const ProductRoute = require('./Routes/ProductRoute.js');
const OrderRoute = require('./Routes/OrderRoute.js');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, (err)=>{
    if(err){
        console.log("Error" + err)
    }
    else{
        console.log('Db is Connected')
    }
})
//////////////////////
app.use(json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
//////////////////////////////////////   Routers    /////////////////////////////////////////////////////
app.use('/api' , route1);
app.use('/api' , ProductRoute)
app.use('/api' , userRoute)
app.use('/api' , OrderRoute)
///////////////////////////////////////////////////////////////////////////////////////////
   /////////////    Middleware   ////////////////
app.use((err , req ,res , next)=>{
    res.status(500).send({message: err.message});
})  

app.listen(port , ()=>{
    console.log(`We are listening you at http://localhost:${port}`)
})