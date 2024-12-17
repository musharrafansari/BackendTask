

const mongoose = require("mongoose")
const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")


const registerUser = async function(req,res){
    try {
        const {name, email, password,role,status} = req.body
        if(!name){
            return res.send({msg : "User name is missing"})
        }
        if(!password){
            return res.send({msg : "Password is missing"})
        }
        if(!role){
            return res.send({msg : "Role is missing"})
        }
        let existUser = await userModel.findOne({email: email})
        if(existUser){
            res.send({msg : "User already exist in the system"})
        }

        let userData = new userModel({
            name : name,
            email : email,
            password : password,   // password should be encrypted
            role : role,
            status : status
        })

        let createUser = userData.save()
        return res.send({msg : "User created successfully",data : createUser})
    } catch (error) {
        console.log("error--->",error)
        throw error
    }
}

const loginUser = async function(req,res){
    try {
        const {email, password} = req.body
        if(!email ){
           return res.send({msg : "Email Id is missing"})
        }
        if(!password ){
           return res.send({msg : "Password is missing"})

        }
        let userCheck = await userModel.findOne({email : email})
        if(!userCheck){
           return res.send({msg : "User not found"})
        }
        let userData = {
            email:email,
            password : password
        }
        let token = jwt.sign(userData,process.env.SECRETKEY)
       return res.send(token)
    } catch (error) {
        console.log("err-->",error)
        throw error
    }
}


module.exports ={
    registerUser,
    loginUser,
}