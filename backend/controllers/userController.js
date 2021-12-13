const User = require("../models/userModel");
const ErrorHander = require("../util/errorhandler");

const catchAyncErros = require("../middleware/catchasyncerros");
const sendToken = require("../util/jwttoken");
const sendEmail = require("../util/sendEmail");

const crypto=require("crypto");
const catchasyncerros = require("../middleware/catchasyncerros");
const cloudinary=require("cloudinary");

// Resgister a user
exports.registerUser = catchAyncErros(async (req, res, next) => {
  const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
    floder:"avatars",
    width:150,
    crop:"scale"
  })
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  // calling jwt token method

  const token = user.getJWTToken();
  sendToken(user, 201, res);
});

// login user
exports.loginUser = catchAyncErros(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHander("please enter email && password", 404));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHander("Please recheck your email and password", 401));
  }
  const checkPass = await user.checkPass(password);
  if (!checkPass) {
    return next(new ErrorHander("Please recheck your email and password", 401));
  }

  const token = user.getJWTToken();

  sendToken(user, 200, res);
});

// forget PAssword
exports.forgetPassword = catchAyncErros(async (req, res, next) => {
  // finding user
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // get reset Token
  const resetToken = user.getResetPasswordToken();

  // by calling getResetPasswordToken() we added values of the reset token
  // and expiry to the user field but havent saved yet
  await user.save({ validateBeforeSave: false });

  // now creating reset passwrd url
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

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
});




// reset password with token and email sent

exports.resetPassword = catchAyncErros(async (req, res, next) => {
  const resetToken = crypto
    .createHash("sha256") //sha256 is an algo used to create hash
    .update(req.params.token)
    .digest("hex");
   
    const user= await   User.findOne({
      resetPasswordToken:resetToken,
      resetPasswordExpire:{$gt:Date.now()},
    });

    if(!user){
      return next(new ErrorHander( "Reset Password Token is invalid or has been expired",400));
    }
    
    if(req.body.password!== req.body.confirmPassword){
      return next(new ErrorHander("Password does not match confm password", 400));
    }

    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
      await user.save();
      sendToken(user, 200, res);
});


// get user details
exports.getUserDetails=catchAyncErros(
  async (req,res,next)=>{
    const user= await User.findById(req.user.id);
    res.status(200).json({
      success:true,
      user
    })
  }
)

// update user password

exports.updateUserPassword=catchAyncErros(
  async (req,res,next)=>{
    const user= await User.findById(req.user.id).select("+password");
    
    const isPassword= await user.checkPass(req.body.oldPassword);

   if (!isPassword) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);


  }
)

// update user profile except passwordexports.getUserDetails=catchAyncErros(
 exports.updateUserDetails=catchAyncErros(
   async (req,res,next)=>{
   
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    // we will do image later

    const user= await User.findByIdAndUpdate( req.user.id,newUserData,{
      new:true,
      runValidators:true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success:true,
      user
    })
   

   }
 )


 //  get all users--admin

 exports.getAllUsers=catchAyncErros(
   async (req,res,next)=>{
     const users=await User.find();
     res.status(200).json({
      success:true,
      users
    })
   }
 )


//  get single user--admin
exports.getSingleUser = catchAyncErros(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});


// update user role to admin (admin rights)

exports.updateuserRole=catchasyncerros(
  async (req,res,next)=>{
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role:req.body.role,
    };
    
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    
    res.status(200).json({
      success: true,
      
    });


  }
)



// delete user admin


exports.deleteUser=catchasyncerros(
  async (req,res,next)=>{
   
    const user =await User.findById(req.params.id);
    
    if (!user) {
      return next(
        new ErrorHander(`User does not exist with Id: ${req.params.id}`)
      );
    }
  

    await user.remove();

  //  we will remove cloudinary later


    
    res.status(200).json({
      success: true,
      message:"user deleted sucessfully "
    });


  }
)

