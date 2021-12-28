import React, { useState } from 'react'
import "./Header.css"
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import {useDispatch, useSelector } from 'react-redux';
import { useNavigate} from "react-router-dom"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userActions';
function UserOptions({user}) {
let history=useNavigate();
const [open, setOpen] = useState(false);
const  dispatch = useDispatch();
const alert=useAlert();
// const { cartItems } = useSelector((state) => state.cart);
const options = [
    { icon: <ListAltIcon />, name: "Cart", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    // {
    //   icon: (
    //     <ShoppingCartIcon
    //       style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
    //     />
    //   ),
    //   name: `Cart(${cartItems.length})`,
    //   func: cart,
    // },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
   history("/admin/dashboard");
  }
  
  function orders() {
    history("/Cart");
  }
  function account() {
    history("/account");
  }
  function cart() {
    history("/cart");
  }
  function logoutUser() {
    dispatch(logout());
  alert.success("logout user");
  history("/");
  }


    return (
        
      <>
      <SpeedDial 
      
      ariaLabel='SpeedDial tooltip example'
      onClose={()=>setOpen(false)}
      onOpen={()=>setOpen(true)}
      open={open}
      className="speedDial"
      icon={
        <img
          className="speedDialIcon"
          src={user?.avatar?.url ? user.avatar.url : <AccountCircleIcon />}
          alt="Profile"
        />
      }
      direction='down'
      > 
      
      {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      
          </SpeedDial>
      </>
    )
}

export default UserOptions
