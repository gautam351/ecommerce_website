const express=require('express');
const bodyParser = require("body-parser")
const cookieParser=require("cookie-parser");
const app=express();
const fileUpload=require("express-fileupload");
const errorMiddleWare=require("./middleware/error");
// Route imports
const product=require("./routes/productRoute");
const User=require("./routes/userRouted");
const Order=require("./routes/orderRoutes");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//isse api request padegi /api/v1/all the routes present in productRoute file
app.use("/api/v1",product);
app.use("/api/v1",User);
app.use("/api/v1",Order);

// Middleware for errors
app.use(errorMiddleWare);

module.exports=app