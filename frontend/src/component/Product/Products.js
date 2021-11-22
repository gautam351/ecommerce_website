import React, { useEffect,useState } from 'react'
import "./Products.css"
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction"
import Loader from '../layout/Loader/Loader';
import Product from '../Home/Product';
import MetaData from '../layout/MetaData';
import {useParams} from "react-router-dom"
import Pagination from "react-js-pagination"
function Products() {
    const dispatch = useDispatch();
   const {keyword}=useParams();
   
    const { products, loading, error,productCount,resultPerPage } = useSelector(
      (state) => state.products
    );
  const [currentPage, setcurrentPage] = useState(1);
  const setCurrentPageNo=(e)=>{
      setcurrentPage(e);
  }
    useEffect(() => {
        dispatch(getProduct(keyword));
      }, [dispatch],keyword);
    
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
