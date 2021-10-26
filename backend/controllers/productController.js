
const Product=require("../models/productModel");
const ErrorHander = require("../util/errorhandler");

const catchAyncErros=require("../middleware/catchasyncerros");


//create product admin
exports.createProduct=catchAyncErros(async(req,res,next)=>{
    const product =await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});



// get all products
exports.getAllProducts=catchAyncErros( async (req,res)=>{
    
    // finding all prodcts
    const  products=  await Product.find();
    res.status(200).json({
        success:true,
        products
    })
    res.status(200).json({message:"Route is working"})
}
);

// Get product details (single proudct)
exports.getSingleProduct=catchAyncErros(
    async(req,res,next)=>{
        const product =await Product.findById(req.params.id);
        if(!product){
            // next is nothing but a callback function  
         return  next(new ErrorHander("Product not found",404));
        }
    
        res.status(201).json({
            success:true,
            product
        })
    }
    
)
// update product : Admin
exports.updateProduct=catchAyncErros(
    async(req,res,next)=>{
let product=Product.findById(req.params.id);
if(!product){
    return next (new ErrorHander("Product not Found",500));
}
  product=await Product.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true,
      useFindAndModify:false
  }) ;

res.status(200).json({
    success:true,
    product
})


}
)



// delete product admin

exports.deleteProduct=catchAyncErros(
    async (req,res,next)=>{
        const product =await Product.findById(req.params.id);
        if(!product){
            return next (new ErrorHander("Product not Found",500));
    
        }
       await product.remove();
       res.status(200).json({
           success:true,
           message:"product deleted successfully"
       })
    }
)