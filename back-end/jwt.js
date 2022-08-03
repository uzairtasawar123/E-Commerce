const JWT = require("jsonwebtoken")

const generateJWT = (user)=>{
    return JWT.sign({
       _id: user._id,
       Name: user.name,
       Email: user.email,
       IsAdmin: user.IsAdmin
    },
     process.env.JWT_SECRET)

}

/////////////////////////////////////////////////////////////////////////////////

 const Auth = (req, res, next) => {
   const authorization = req.headers.authorization;
   if (authorization) {
     //const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
     JWT.verify(authorization, process.env.JWT_SECRET, (err, decode) => {
       if (err) {
         res.status(401).send({ message: 'Invalid Token' });
       } else {
         req.user = decode;
         next();
       }
     });
   } else {
     res.status(401).send({ message: 'No Token' });
   }
 };

module.exports  = generateJWT;
module.exports = Auth;