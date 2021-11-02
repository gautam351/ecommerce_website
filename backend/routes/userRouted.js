const express=require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { logoutUser } = require("../middleware/auth");
const router=express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);
module.exports=router;