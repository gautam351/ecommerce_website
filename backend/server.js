const app=require("./app");


const dotenv=require("dotenv");
const port=3000;

const connectDb=require("./config/database");
// config dotenv file
dotenv.config({path:"backend/config/config.env"});

//connect to db
connectDb();

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});