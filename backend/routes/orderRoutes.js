const express=require("express");
const { createNewOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder, getAllOrderAdmin } = require("../controllers/orderController");

const router=express.Router();


const { isAuthUser, AuthRoles } = require("../middleware/auth");



router.route("/order/new").post(isAuthUser,createNewOrder); 
router.route("/order/:id").get(isAuthUser,   getSingleOrder);
router.route("/orders/me").get(isAuthUser,myOrders);


// for admin   
// note: admi instead of admin...dont change

router.route("/admi/orders").get(isAuthUser,getAllOrders);


router
  .route("/admin/order/:id")
  .put(isAuthUser, AuthRoles("admin"),updateOrder)
  .delete(isAuthUser, AuthRoles("admin"), deleteOrder);

module.exports=router;