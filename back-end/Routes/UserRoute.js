const express = require('express');
const User = require('../UserSchema');
const bcrypt = require('bcryptjs');
const generateJWT = require('../jwt');
const { response } = require('express');
const expressAsyncHandler = require('express-async-handler')
const Auth = require("../jwt");
const userRoute = express.Router();



////////////////////////////    Sign Up   /////////////////////////////////
userRoute.post('/user/signup' , async (req , res)=>{
  const userInfo = new User({
     name: req.body.name,
     email: req.body.email,
     password: bcrypt.hashSync(req.body.password),
  });
    const user = await userInfo.save();
  if(user){
  res.status(200).send({
    _id: user._id,
    name: user.name,
    email: user.email,
    IsAdmin: user.IsAdmin,
    token: generateJWT(user)
  })
 }
 else{
  res.send("Can't create User")
 }
})




/////////////////////////////   Sign In   ///////////////////////////////
userRoute.post('/user/signin',  expressAsyncHandler(async (req, res) => {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateJWT(user),
          });
          return;
        }
      }
      res.status(401).send({ message: 'Invalid email or password' });
    })
  );



////////////////////////     Update User Profile     //////////////////////////
userRoute.put(
  '/user/profile',
  Auth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.IsAdmin,
        token: generateJWT(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);


module.exports = userRoute;