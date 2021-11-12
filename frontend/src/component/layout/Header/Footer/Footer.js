import React from "react";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';

import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android mobile phone</p>
        <img
          src="https://mern-stack-ecommerce-store.herokuapp.com/static/media/playstore.82b48319.png"
          alt="playStore"
        />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights &copy;{ new Date().getFullYear()}  </p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
       <InstagramIcon fontSize="large" />
       <FacebookIcon fontSize="large"/>
       <YouTubeIcon fontSize="large"/>
      </div>
    </footer>
  );
};

export default Footer;