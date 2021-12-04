import './App.css';
import Header from './component/layout/Header/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";import WebFont from 'webfontloader';
import { useEffect } from 'react';
import Footer from './component/layout/Header/Footer/Footer';

import Home from "./component/Home/Home"
import Loader from './component/layout/Loader/Loader';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignup from './component/User/LoginSignup';
function App() {

  
useEffect(() => {
  
  WebFont.load({
    google:{
      families: ["Roboto", "Droid Sans", "Chilanka"],
    }
  })
  
   
  }, []);
  

  return (
   
<>

  <Router > 
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/loading" element={<Loader/>} />
    <Route path="/product/:id" element={<ProductDetails/>} />
    <Route path="/products" element={<Products/>} />
    <Route path="/search" element={<Search/>} />
    <Route path="/products/:keyword" element={<Products/>} />
    <Route path="/login" element={<LoginSignup/>}/>

  </Routes>
  <Footer />
  </Router>
</>

  );
}

export default App;
