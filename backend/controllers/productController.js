const Product = require("../models/productModel");
const ErrorHander = require("../util/errorhandler");

const catchAyncErros = require("../middleware/catchasyncerros");
const Apifeauters = require("../util/apifeatures");

//create product admin
exports.createProduct = catchAyncErros(async (req, res, next) => {
  req.body.user = req.body.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// get all products
exports.getAllProducts = catchAyncErros(async (req, res) => {
  // return next(new ErrorHander("lol alert",500));
  const productCount=await Product.countDocuments();
  // finding all prodcts
  const apifeatures = new Apifeauters(Product.find(), req.query)
    .search()
    .filter()
    .pagination(8);
  const products = await apifeatures.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
    
  });
  res.status(200).json({ message: "Route is working" });
});

// Get product details (single proudct)
exports.getSingleProduct = catchAyncErros(async (req, res, next) => {
  // finding total numbers of products in the doc
  const Productcount = await Product.countDocuments();

  const product = await Product.findById(req.params.id);
  if (!product) {
    // next is nothing but a callback function
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(201).json({
    success: true,
    product,
    Productcount,
  });
});
// update product : Admin
exports.updateProduct = catchAyncErros(async (req, res, next) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product not Found", 500));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// delete product admin

exports.deleteProduct = catchAyncErros(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product not Found", 500));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});

// Create New Review or Update the review

exports.createProductReview = catchAyncErros(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = await product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  //   caluclating avg rating

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// get all reviwes of a prodcut

exports.getallreviews = catchAyncErros(async (req, res, next) => {
  const product = await Product.findById(req.query.id)
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    review: product.reviews,
  });
});

// Delete Review

exports.deleteReview = catchAyncErros(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
   
  });
});
