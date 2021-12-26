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
import store from "./store" 
import { loadUser } from './actions/userActions';
import { useSelector } from 'react-redux';
import UserOptions from "./component/layout/Header/UserOptions"
import Profile from './component/User/Profile';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgetPassword from './component/User/ForgetPassword';
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  
useEffect(() => {
  WebFont.load({
    google:{
      families: ["Roboto", "Droid Sans", "Chilanka"],
    }
  })
  
   store.dispatch(loadUser());
  }, []);
  

  return (
   
<>

  <Router > 
  <Header/>
   
  {isAuthenticated && <UserOptions user={user} /> }

  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/loading" element={<Loader/>} />
    <Route path="/product/:id" element={<ProductDetails/>} />
    <Route path="/products" element={<Products/>} />
    <Route path="/search" element={<Search/>} />
    <Route path="/products/:keyword" element={<Products/>} />
    <Route path="/login" element={<LoginSignup/>}/>
    <Route path="/account" element={<Profile/>   }/>
    <Route path= "/me/update" element={<UpdateProfile user={user} isAuthenticated={isAuthenticated} /> }  />
    <Route path= "/password/update" element={<UpdatePassword user={user} isAuthenticated={isAuthenticated} /> }  />
    <Route path= "/password/forgot" element={<ForgetPassword  /> }  />

  </Routes>
  <Footer />
  </Router>
</>

  );
}

export default App;
