class Apifeauters {
    constructor(query,queryStr){
        // query=product.find()
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

// case sensitive filter of products
    filter(){
        // if direct this.queryStr krte to copy variable me ref pass ho jata insted of making a copy therefore we used spread operator for copyingobjects
        const querycopy={...this.queryStr};
        // removing some fields for category (query params)
        const removeFields=["keyword","page","limit"];
        removeFields.forEach((key)=>delete querycopy[key]);
         
    //  filter for price and rating since it requires a range as argument
    // basically when we search in mongodb oerators have $ infront of them 
    // so we just stringify our filter query and add $ in front odf operators
    let queryStr=JSON.stringify(querycopy);
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`);



    //    converting sting query into object
        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }

// creating  pagination means  no. ofproducs per page

pagination(resultperPage){
    // which page we are at..if provided in query good else 1
    const currentPage=Number(this.queryStr.page) || 1;
    // number of products we need to skip while jumping to some another page
    const skip= resultperPage *(currentPage-1);
    this.query=this.query.limit(resultperPage).skip(skip);
    return this;

}




}


module.exports=Apifeauters