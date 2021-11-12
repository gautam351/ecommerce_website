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

  
  </Routes>
  <Footer />
  </Router>
</>

  );
}

export default App;
