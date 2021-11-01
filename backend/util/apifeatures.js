class Apifeauters {
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

// this function will simple search for the keyword in mongodb doc (case insensitive)
    search(){
        const keyword=this.queryStr.keyword?
        // if found
        {
        //   we wanna search particullar pattern from monogd docs eg: all docs which have samosa anywhere in there name 
            name:{
                // $regex is a mongodb operator regular expression
               $regex:this.queryStr.keyword,
            //   this options operator make the search case insensitive
               $options:"i",
            }
        }:
        // if not found
        {};
       
   this.query=this.query.find({...keyword});
   return this;

    }
}


module.exports=Apifeauters