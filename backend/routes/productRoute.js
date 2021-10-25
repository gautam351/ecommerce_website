
// in this file we gonna create diffrent routes and controller is in diffrent file.

const express=require('express');
const { getAllProducts, createProduct } = require('../controllers/productController');
const router=express.Router();


router.route("/product").get(getAllProducts);
router.route("/product/new").post(createProduct);

module.exports =router