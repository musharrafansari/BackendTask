const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {type: String,require :true},
    email : {type: String},
    password : {type : String, require:true},
    status : {type :String,enum:["Active,Inactive"],default : "Active"},
    role : {type :String ,enum:["User","Admn"],require : true},
    created_date : {type:Date, default : Date.now()}
})

module.exports= mongoose.model("user",userSchema)