import React from 'react'
import { CgMouse } from 'react-icons/cg'
import "../Home/Home.css"
 import Product from "./Product"

const product={
    name:"blue shirt",
    image:[{url:"https://mern-stack-ecommerce-store.herokuapp.com/static/media/playstore.82b48319.png"}],
    price:"$3000",
    _id:"Praveen"
}

function Home() {
    return (
        <>
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
   <Product product={product} />
   <Product product={product} />
   <Product product={product} />
   <Product product={product} />
   <Product product={product} />
   <Product product={product} />
   <Product product={product} />
   <Product product={product} />

   </div>
 </>   )
}

export default Home
