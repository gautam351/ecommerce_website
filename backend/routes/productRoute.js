// in this file we gonna create diffrent routes and controller is in diffrent file.

const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controllers/productController");
const { isAuthUser } = require("../middleware/auth");
const router = express.Router();

// route to get all products
router.route("/product").get(isAuthUser,AuthRoles("admin"), getAllProducts);

// route for create new product
router.route("/product/new").post(isAuthUser, createProduct);

// router to update your product
router
  .route("/product/:id")
  .put( isAuthUser, updateProduct)
  .delete(isAuthUser, deleteProduct)
  .get(getSingleProduct);

module.exports = router;
