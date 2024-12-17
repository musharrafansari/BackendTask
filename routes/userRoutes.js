const express = require("express")
const userController = require("../controller/userController")

const router = express.Router()


router.get("/getAllUsers",userController.getAllUsers)

module.exports = router