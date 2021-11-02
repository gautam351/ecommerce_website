const express=require('express');
const bodyParser = require("body-parser")

const app=express();
const errorMiddleWare=require("./middleware/error");
// Route imports
const product=require("./routes/productRoute");
const User=require("./routes/userRouted");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));



//isse api request padegi /api/v1/all the routes present in productRoute file
app.use("/api/v1",product);
app.use("/api/v1",User)

// Middleware for errors
app.use(errorMiddleWare);

module.exports=app