const mongoose=require("mongoose");



// creating schema design for products
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
       trim:true
       
    },
    description:{
        type:String,
       required:true,
    },
    price:{
        type:Number,
         required:[true,"please enter product price"],
        maxlength:[6,"price cannot exceed 6 fig value"]
    },
    rating:{
        type:Number,
        default:1
        
    },
    //images will be uploaded in cloud navy ...and there we get public id for every iamge
    images:[
       { public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],
    category:{
        type:String,
        required:[true,"please enter product  category"]
    },
    stock:{
        type:Number,
        required:[true,"please enter product stock"],
        maxlength:[4,"cannot exceed 4 fig value "],
        default:1,
        
    },
    noofReview:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,
                default:1
            },
            comment:{
                type:String,
                required:true
                
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }

});


module.exports = mongoose.model("Product", productSchema);
