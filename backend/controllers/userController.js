const User = require("../models/userModel");
const ErrorHander = require("../util/errorhandler");

const catchAyncErros = require("../middleware/catchasyncerros");

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

  res.status(201).json({
    success: true,
    user,
    token,
  });
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

  res.status(200).json({
    success: true,
    user,
    token,
  });
});
