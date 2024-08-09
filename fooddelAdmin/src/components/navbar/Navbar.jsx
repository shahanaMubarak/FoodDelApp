// src/components/navbar/Navbar.jsx
import React from 'react';
import './Navbar.css';
import {assets} from '../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Logo" />
      <img className='profile' src={assets.basket_icon} alt="Profile" />
    </div>
  );
};

export default Navbar;
