const express=require('express');
const bodyParser = require("body-parser")

const app=express();

// Route imports
const product=require("./routes/productRoute");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));



//isse api request padegi /api/v1/all the routes present in productRoute file
app.use("/api/v1",product);


module.exports=app