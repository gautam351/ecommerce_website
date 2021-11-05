const User = require("../models/userModel");
const ErrorHander = require("../util/errorhandler");

const catchAyncErros = require("../middleware/catchasyncerros");
const sendToken=require("../util/jwttoken")
// Resgister a user
exports.registerUser = catchAyncErros(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "thisis a sample id",
      url: "profileurl",
    },
  });

  // calling jwt token method

  const token = user.getJWTToken();
 sendToken(user,201,res);
  
 
});

// login user
exports.loginUser = catchAyncErros(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHander("please enter email && password", 404));
  }
  const user = await  User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHander("Please recheck your email and password", 401));
  }
  const checkPass = await  user.checkPass(password);
  if (!checkPass) {
    return next(new ErrorHander("Please recheck your email and password", 401));
  }

  const token = user.getJWTToken();

  sendToken(user,200,res);
});



// forget PAssword
exports.forgetPassword=catchAyncErros(
  async (req,res,next)=>{
    
    // finding user
    const user= await User.findOne({email:req.body.email});
    if(!user){
      return next( new ErrorHander("User not found",404))
    }
    

    // get reset Token
    const resetToken= user.getResetPasswordToken();

    // by calling getResetPasswordToken() we added values of the reset token 
    // and expiry to the user field but havent saved yet
    await user.save({validateBeforeSave:false});
    

    // now creating reset passwrd url
    const resetPasswordUrl= `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
    

    // now sending mail and catiching error

    try {
      await sendEmail({
        email: user.email,
        subject: `Ecommerce Password Recovery`,
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {

      // if error occur db me jo token saved hai unhe undefined kro
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new ErrorHander(error.message, 500));
    }
      

  }
)