import React, { useEffect,useState } from 'react'
import "./Products.css"
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction"
import Loader from '../layout/Loader/Loader';
import Product from '../Home/Product';
import MetaData from '../layout/MetaData';
import {useParams} from "react-router-dom"
import Pagination from "react-js-pagination"
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
function Products() {

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

    const dispatch = useDispatch();
   const {keyword}=useParams();
   
    const { products, loading, error,productCount,resultPerPage,filteredProductsCount } = useSelector(
      (state) => state.products
    );
  const [currentPage, setcurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const ratingHandler=(e,newRating)=>{
   setRatings(newRating);
   console.log(newRating);
  }
  const [ratings, setRatings] = useState(0);

  const setCurrentPageNo=(e)=>{
      setcurrentPage(e);
  }
  let count = filteredProductsCount;

  useEffect(() => {
    

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

    return (
        <>
 {loading?<Loader /> : <>

    <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>
        
          <div className="products">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
          
   

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={ratingHandler}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>



          <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
 </>
 }
        </>
    )
}

export default Products
