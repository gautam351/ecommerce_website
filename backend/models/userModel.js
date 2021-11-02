const mongoose=require("mongoose")
const validator=require("validator")
const bycrpt=require("bcryptjs");
const jwt=require("jsonwebtoken");
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
const JWT_SECRET="jkbkdjbkdjbouahfebfafafakfbaifaafkajnaf";
const JWT_EXPIRE=5;
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id },JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};


userSchema.methods.checkPass= async function(enteredpass){
  return  await bycrpt.compare(enteredpass,this.password);
}


module.exports=mongoose.model("user",userSchema)