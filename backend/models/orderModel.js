const mongoose=require("mongoose");

// crating order product schema 
const orderSchema=new mongoose.Schema({

   
    shippingInfo: {
        address: {
          type: String,
          required: [ true,"enter address of delivery"],
        },
        city: {
          type: String,
          required:  [true,"enter city of delivery"],
        },
    
        state: {
          type: String,
          required:  [true,"enter state of delivery"],
        },
    
        country: {
          type: String,
          required:  [true,"enter country of delivery"],
        },
        pinCode: {
          type: Number,
          required:  [true,"enter pincode of delivery"],
        },
        phoneNo: {
          type: Number,
          required:  [true,"enter phoneno of delivery"],
        },
      },
      orderItems: [
        {
          name: {
            type: String,
            required:  [true,"enter name of item"],
          },
          price: {
            type: Number,
            required:  [true,"enter price"],
          },
          quantity: {
            type: Number,
            required:  [true,"enter quantity"],
          },
          image: {
            type: String,
            required:  [true,"enter image"],
          },
          product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required: true
          },
        },
      ],
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required:  true,
      },
      paymentInfo: {
        id: {
          type: String,
          required:  true,
        },
        status: {
          type: String,
          required:   true,
        },
      },
      paidAt: {
        type: Date,
        required:   true,
      },
      itemsPrice: {
        type: Number,
        required:  true,
        default: 0,
      },
      taxPrice: {
        type: Number,
        required:   true,
        default: 0,
      },
      shippingPrice: {
        type: Number,
        required:  true,
        default: 0,
      },
      totalPrice: {
        type: Number,
        required:   true,
        default: 0,
      },
      orderStatus: {
        type: String,
        required:   true,
        default: "Processing",
      },
      deliveredAt: Date,
      createdAt: {
        type: Date,
        default: Date.now,
      },
  
  


})



module.exports=mongoose.model("Order",orderSchema);