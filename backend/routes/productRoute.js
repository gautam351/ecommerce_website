// in this file we gonna create diffrent routes and controller is in diffrent file.

const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getallreviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthUser, AuthRoles } = require("../middleware/auth");
const router = express.Router();

// route to get all products
router.route("/product").get( getAllProducts);

// route for create new product
router.route("/admin/product/new").post(isAuthUser,AuthRoles("admin"), createProduct);

// router to update your product
router
  .route("/admin/product/:id")
  .put( isAuthUser,AuthRoles("admin"), updateProduct)
  .delete(isAuthUser,AuthRoles("admin"), deleteProduct);

  router.route("/product/:id").get(getSingleProduct);
 

  // route to create/ update review
  router.route("/review").put(isAuthUser,createProductReview);



  // route to get all reviews and delete a reiview
  router.route("/reviews").get(getallreviews).delete(isAuthUser,deleteReview);
module.exports = router;
