


 import ReactStarts from "react-rating-stars-component";





import React from 'react'
import {Link} from "react-router-dom"
function Product(props) {

  const options = {
            value: 4,
            readOnly: true,
            precision: 0.5,
            edit:false
          };



  return (
    <div>
         <Link className="productCard" to={props.product?._id}>

         <img src={props.product?.image[0]?.url} alt={props.product?.name} />
         <p>{props.product?.name}</p>
        <div>

        <ReactStarts  {...options}  />
          {" "}
          <span className="productCardSpan">
            {" "}
            ( 256 Reviews)
          </span>
        </div>
        <span>{`₹${props.product?.price}`}</span>

         </Link>
    </div>
  )
}

export default Product
