// in this file we gonna create diffrent routes and controller is in diffrent file.

const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controllers/productController");
const { isAuthUser, AuthRoles } = require("../middleware/auth");
const router = express.Router();

// route to get all products
router.route("/product").get( getAllProducts);

// route for create new product
router.route("/product/new").post(isAuthUser,AuthRoles("admin"), createProduct);

// router to update your product
router
  .route("/product/:id")
  .put( isAuthUser,AuthRoles("admin"), updateProduct)
  .delete(isAuthUser,AuthRoles("admin"), deleteProduct)
  .get(getSingleProduct);

module.exports = router;
