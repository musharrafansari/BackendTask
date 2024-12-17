const express = require("express")
const app= express()
require("dotenv").config()
const bodyParser = require("body-parser")
const userRoute = require("./routes/userRoutes")
const loginRoute = require("./routes/loginRoutes")
const auth = require("./middleware/auth")
require("./connection").connectDb()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/login",loginRoute)
app.use("/user",auth.authentication,userRoute)

let port = process.env.PORT || 4000

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})