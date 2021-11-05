const mongoose=require("mongoose")
const validator=require("validator")
const bycrpt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto = require("crypto");
const userSchema=new mongoose.Schema({

   name:{
       type:String,
       required:[true,"please enter your name"],
       maxlength:[30,"name must contain upto 30 characters"],
       minlength:[4,"name must contain atleast 4 char"],

   },
   email:{
       type:String,
       required:[true,"please enter your email"],
       unique:true,
       validate:[validator.isEmail,"please enter  a valid email"],
   },
   password:{
    type:String,
    required:[true,"please enter your password"],
    minlength:[8,"min len of password is 8 "],
    // means find method is when applied to db then leave this field in result
    select:false,
   },
   avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role:{
    type:String,
    default:"user",
  },
  createdAt:{
      type:Date,
      default:Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,



})



// hashing the password before saving to db
userSchema.pre("save",async function(next){
  // in cases of profile update is password is not change then dont hash it
  if(!this.isModified("password")){
       next();
  }
  this.password=  await bycrpt.hash(this.password,10)
});



// JWT TOKEN
const JWT_SECRET=process.env.JWT_SECRET;
const JWT_EXPIRE=5;
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id },process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


// password comparision
userSchema.methods.checkPass= async function(enteredpass){
  return  await bycrpt.compare(enteredpass,this.password);
}


// generating reset pass token
userSchema.methods.getResetPasswordToken=function(){


// generating random token
const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
  .createHash("sha256") //sha256 is an algo used to create hash
  .update(resetToken)
  .digest("hex");


  // setting token expiry in 15 mins
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;

}





module.exports=mongoose.model("user",userSchema)