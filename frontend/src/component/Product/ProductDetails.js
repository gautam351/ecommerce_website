import { React, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import ReactStarts from "react-rating-stars-component";
import Review  from "./Review";

import Loader from "../layout/Loader/Loader"
function ProductDetails(props) {
  const { id } = useParams();
  let arr=[1,2,3,4,5];
 
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);
  const options = {
    size: "large",
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      {loading?<Loader /> :
       <>
       <MetaData title={`${product?.name} -- ECOMMERCE`} />
      <div className="ProductDetails">
        <div className="Carouseldiv">
          <Carousel className="Carouseltag">
            {product.images &&
              product.images.map((item, i) => (
                <center>
                  <img
                  className="CarouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
                </center>
              ))}
          </Carousel>
        </div>

        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
          <ReactStarts  {...options}  /> 
            <span className="detailsBlock-2-span">
              {" "}
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button>-</button>
                <input readOnly type="number" />
                <button>+</button>
              </div>
              <button
                disabled={product.stock < 1 ? true : false}
                // onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            </div>

            <p>
              Status:
              <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                {product.stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>
          <div className="detailsBlock-4">
            Description : <p>{product.description}</p>
          </div>
          <button className="submitReview">Submit Review</button>
        </div>
      </div>
      <h3 className="reviewsHeading">REVIEWS</h3>
      {product.noofReview && product.noofReview[0] ? (
            <div className="reviews">
              {product.noofReview &&
                product.noofReview.map((review) => (
                  <Review r={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}

       </>
      }
    </>
  );
}

export default ProductDetails;
