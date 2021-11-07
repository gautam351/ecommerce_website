const ErrorHander = require("../util/errorhandler");
const errorHandler=require("../util/errorhandler");



module.exports =(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "INTERNAL SERVER ERROR";
    
    // WRONG MONGOdB ID(CHOTI YA BADI ID DAAL DIYE TO) ERROR HANDELLING
    if(err.name=="CastError"){
        const message=`Resource Not Found.Inval id:${err.path}`;
        err=new ErrorHander(message,400);
    }
    
    // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        // this will tell us exactly kis line me error hai
        error:err.stack,

    });
}