const ErrorHander = require("../util/errorhandler");
const catchAsyncErrors = require("./catchasyncerros");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


exports.isAuthUser= catchAsyncErrors( 
    async (req,res,next)=>{
        const {token} =req.cookies;
        if(!token){
            return next(new ErrorHander("please login to access this resource",401));
        }
     
        

        const decodedData= jwt.verify(token,process.env.JWT_SECRET);
       
        req.user= await User.findById(decodedData.id);
        next();
    }
)


exports.logoutUser=catchAsyncErrors(
    async (req,res,next)=>{

 
        res.cookie("token",null,{
            expires: new Date(Date.now()),
            httpOnly:true,
        })
  
        res.status(200).json({
            success:true,
            message:"Logged out",
        })


    }
)