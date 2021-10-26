
// this is nothing but try and catch ....async fucntion will be passed as theFunc if the promise resolves then cool esle catch will get
// executed
module.exports=(theFunc)=>(req,res,next)=>{
    Promise.resolve(theFunc(req,res,next)).catch(next);
}