/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import { RxHamburgerMenu } from "react-icons/rx";
{/* */ }
import { FaCartShopping } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

{/* */ }
import {
  ShoppingBag,
  User as UserIcon,
  Menu,
  X,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { useApp } from "../store/AppContext";
import { button, nav } from "motion/react-client";

export const Navbar = () => {
  const { user, cart, logout } = useApp();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const cartCount =
    cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  const redirectToCart = () => {
    navigate('/cart')
  }
  return (
    
    <>
    <nav className="bg-white flex md:justify-evenly justify-between z-10 sticky top-0">
      {/* logo */}
      <div className="flex items-center
      ">
        <img src={logo} alt="logo" className="md:h-20 md:w-20 w-15 h-15 rounded-2xl" />
        <span className="text-2xl font-bold text-[#2b493c]">AyuDravya</span>
      </div>
      {/* navlinks */}
      <div className="md:flex gap-3 items-center hidden ">
        <NavLink to={'/'}
          className={({ isActive }) => `no-underline! text-gray-500! ${isActive ? "border border-green-900! text-green-900! px-3 py-2 rounded" : ''}`}
        >Home</NavLink>
        <NavLink to={'/products'}
          className={({ isActive }) => `no-underline! text-gray-500! ${isActive ? "border border-green-900! text-green-900!  px-3 py-2 rounded" : ''}`}
        >Show Product</NavLink>
        <NavLink to={'/about'}
          className={({ isActive }) => `no-underline! text-gray-500! ${isActive ? "border border-green-900! text-green-900!  px-3 py-2 rounded" : ''}`}
        >About</NavLink>
        {
          user && <NavLink to={'/orders'}
            className={({ isActive }) => `no-underline! text-gray-500! ${isActive ? "border border-green-900! text-green-900!  px-3 py-2 rounded" : ''}`}
          >My Orders</NavLink>
        }
      </div>
      {/* carts and login btns */}
      <div className="md:flex items-center gap-4 hidden">
        <div>
          <FaCartShopping className="md:h-8 md:w-8 text-[#2C4A3E] inline-block relative" onClick={redirectToCart} />
          {
            cartCount > 0 && <span className=" text-xl absolute top-2 font-semibold text-gray-600">{cartCount}</span>
          }
        </div>
        {
          user ?
            <button className="rounded  bg-[#2C4A3E] text-white p-2"
              onClick={handleLogout}>Logout</button>
            : <>
              <Link to="/login" className="no-underline! text-gray-500! hover:text-[#2C4A3E] ">Login</Link>
              <Link to="/register" className="no-underline! px-3 py-2 bg-[#2C4A3E] text-white ">Register</Link>
            </>

        }
      </div>
      <div>

        {/* MOBILE VIEW  */}

        {
          isOpen ? <RxCross1 className="md:hidden text-[#2C4A3E] text-4xl font-semibold text-center" onClick={()=>{setIsOpen(!isOpen)}} />:
            <RxHamburgerMenu className="md:hidden text-[#2C4A3E] text-4xl font-semibold" onClick={()=>{setIsOpen(!isOpen)}}/> 
           
        }


      </div>
     


{/* mobile options
 */}
      
    </nav>
     <div className={` flex flex-col gap-4 m-3 ${isOpen ? 'block':'hidden'} `}>
        <NavLink to={'/'}
          className={({ isActive }) => `no-underline! text-gray-500! ${isActive ? "border border-green-900! text-green-900! px-3 py-2 rounded" : ''}`}
        >Home</NavLink>
        <NavLink to={'/products'}
          className={({ isActive }) => `no-underline! text-gray-500! ${isActive ? "border border-green-900! text-green-900!  px-3 py-2 rounded" : ''}`}
        >Show Product</NavLink>
        <NavLink to={'/about'}
          className={({ isActive }) => `no-underline! text-gray-500! ${isActive ? "border border-green-900! text-green-900!  px-3 py-2 rounded" : ''}`}
        >About</NavLink>
        {
          user && <NavLink to={'/orders'}
            className={({ isActive }) => `no-underline! text-gray-500! ${isActive ? "border border-green-900! text-green-900!  px-3 py-2 rounded" : ''}`}
          >My Orders</NavLink>
        }
        <div>
          <FaCartShopping className="md:h-8 md:w-8 text-[#2C4A3E] inline-block relative" onClick={redirectToCart} />
          {
            cartCount > 0 && <span className=" text-xl absolute top-2 font-semibold text-gray-600">{cartCount}</span>
          }
        </div>
        {
          user ?
            <button className="rounded  bg-[#2C4A3E] text-white p-2"
              onClick={handleLogout}>Logout</button>
            : <>
              <Link to="/login" className="no-underline! text-gray-500! hover:text-[#2C4A3E] ">Login</Link>
              <Link to="/register" className="no-underline! text-gray-500!">Register</Link>
            </>

        }
      </div>
    </>
  );
};
