const jwt = require("jsonwebtoken");

const authenticateMiddleware = (req,res,next) =>{
    try{
          const token = req.headers.authorization.split(' ')[1]
          const  decode = jwt.verify(token, 'SECRET_PRIVATE_KEY')

          req.user = decode
          next()
    }

    catch(error){
        res.json({
            messaage: "Authentication Failed!",
            error
          });
    }
}

module.exports = authenticateMiddleware