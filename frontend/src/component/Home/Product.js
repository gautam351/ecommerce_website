


 import ReactStarts from "react-rating-stars-component";





import React from 'react'
import {Link} from "react-router-dom"
function Product(props) {

  const options = {
            value: props.product?.rating,
            readOnly: true,
            precision: 0.5,
            edit:false
          };



  return (
    <div>
         <Link className="productCard" to={props.product?._id}>

         <img src={props.product?.images[0]?.url} alt={props.product?.name} />
         <p>{props.product?.name}</p>
        <div>

        <ReactStarts  {...options}  />
          {" "}
          <span className="productCardSpan">
            ({props.product?.numofReviews}
            Reviews)
          </span>
        </div>
        <span>{`₹${props.product?.price}`}</span>

         </Link>
    </div>
  )
}

export default Product
