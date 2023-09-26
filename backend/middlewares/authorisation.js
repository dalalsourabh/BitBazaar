const JWT = require("jsonwebtoken");
require("dotenv").config();
const Key = process.env.SecretKey;

const authorisation = (req,res,next)=>{
    const token = req.header('authTokenKST');
    if(!token){
        res.send("Access Denied!!");
    }

    try{
        JWT.verify(token,Key);
        next();
    }catch{
        res.send("Access Denied!!");
    }
}

module.exports = authorisation;

