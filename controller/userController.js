const mongoose = require("mongoose")
const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")


const getUser = async function(req,res){
    try {
        let userId = req.params.userId
        if(!userId){
            return res.send({msg : "User Id is missing"})
        }
        let userDetails = await userModel.findOne({_id :userId})
        if(!userDetails){
            return res.send({msg : "user not found"})
        }
        return res.send(userDetails)
    } catch (error) {
        console.log("err-->",error)
        throw error
    }
}

const updateUser = async function(req,res){
    try {
        const {name,email} = req.body
        const userId = req.params.userId

        if(!userId){
            return res.send({msg : "User Id is missing"})
        }

        let updateBody = {
            name : name,
            email : email
        }

        let updateData = await userModel.findOneAndUpdate({_id:userId},updateBody,{new:true})
        if(!updateData){
            return res.send({msg : "User data updated successfully"})
        }
        return res.send(updateData)
    } catch (error) {
        console.log("err-->",error)
        throw error
    }
}

const deleteUser = async function(req,res){
    try {
        let userId = req.params.userId
        if(!userId){
            return res.send({msg : "User Id is missing"})
        }

        let checkUser = await userModel.findOne({_id:userId})
        if(!checkUser){
            return res.send({msg:"User not found"})
        }
        let deleteUser = await userModel.findByIdAndDelete(userId)
        if(!deleteUser){
            return res.send({msg : "User already deleted"})
        }
        return res.send({msg:"User deleted successfully"})
    } catch (error) {
        console.log("err-->",error)
        throw error
    }
}

const getAllUsers = async function(req,res){
    try {
        // let role = req.body.role    
        let adminId = req.params.adminId

        let query= {
            $and :[
                {_id:adminId},
                {role : "Admin"}
            ]
        }
        let checkAdmin = await userModel.findOne(query)
        if(checkAdmin.length==0){
            return res.send({msg : "Admin not found"})
        }
        let getAllUserDetails = await userModel.find({role : "User"})
        return res.send(getAllUserDetails)
    } catch (error) {
        console.log("err-->",error)
        throw error
    }
}


module.exports ={
    updateUser,
    getAllUsers,
    deleteUser,
    getUser
}