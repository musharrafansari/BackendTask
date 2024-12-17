const express = require("express")
const userController = require("../controller/userController")
const loginController = require("../controller/loginContoller")
const loginRouter = express.Router()


loginRouter.post("/registerUser",loginController.registerUser)
loginRouter.post("/loginUser",loginController.loginUser)


module.exports = loginRouter