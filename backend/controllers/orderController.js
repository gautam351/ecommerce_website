const Order = require("../models/orderModel");
const ErrorHander = require("../util/errorhandler");
const Product = require("../models/productModel");
const catchAyncErros = require("../middleware/catchasyncerros");
const catchasyncerros = require("../middleware/catchasyncerros");



// create new orders 
exports.createNewOrder=catchAyncErros(
    async (req,res,next)=>{
   
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
          } = req.body;

          const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
          });

          res.status(200).json({
              success:true,
              order,
          })

    }
)



// get Single Order

exports.getSingleOrder = catchAyncErros(async (req, res, next) => {

    // populate menans req.params.id ke respect me jo user hai User schema me usse name and email  ki details retrive krlo
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    )
  
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }
  
    res.status(200).json({
      success: true,
      order,
    });
  });

  
// get logged in user  Orders
exports.myOrders = catchasyncerros(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
  if(!order){
      return next(new ErrorHander("not found any order",404));
  }
    res.status(200).json({
      success: true,
      orders,
    });
  });
  
// get all Orders -- Admin
exports.getAllOrders = catchAyncErros(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});


// update Order Status -- Admin
exports.updateOrder = catchasyncerros(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHander("You have already delivered this order", 400));
    }
  
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });
  
  async function updateStock(id, quantity) {
    const product = await Product.findById(id);
  
    product.Stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }
  
  // delete Order -- Admin
  exports.deleteOrder = catchasyncerros(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }
  
    await order.remove();
  
    res.status(200).json({
      success: true,
    });
  });