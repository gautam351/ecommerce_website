import { React, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "../Home/Home.css";
import Product from "./Product";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/loader";

function Home() {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } =  useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  return (
    <>
     {loading?(<Loader/>): (<>
      <MetaData title="Ecommerce" />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
  
      {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}


      </div>
     
     </>)}
    </>
  );
}

export default Home;
