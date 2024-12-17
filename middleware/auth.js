const mongoose = require("mongoose")
const jwt  = require("jsonwebtoken")


const authentication = async function(req,res,next){
    try {
        const {email,password} = req.body
        let token = req.headers["Authorization"]
        if(!token){
            res.send({msg : "Token is missing"})
        }
        let userData= {
            email :email,
            passeord : password
        }
        let verifyToken = jwt.verify(userData,process.env.SECRETKEY)
        if(!verifyToken){
            return res.send({msg : "Unauthorized user"})
        }
        req.UserData = verifyToken
        next()
    } catch (error) {
        console.log("err-->",error)
        throw error
    }
}

module.exports= {authentication}