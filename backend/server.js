const app=require("./app");


 
const port=3000;

const connectDb=require("./config/database");
// config dotenv file

  

    require("dotenv").config({ path: "config/config.env" });
  
  

//connect to db
connectDb();

const server= app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});

// when unhandeled errors occurs then we have to shut down our server asap
process.on("unhandledRejection",(err)=>{
    console.log(`error:${err.message}`);
    console.log(`Shutting Down Server Due To Unhandeled Promise Rejections`);
// closing the  server
    server.close(()=>{
    process.exit(1);
})
})





