// src/components/sidebar/Sidebar.jsx
import React from 'react';
import './Sidebar.css';
import {assets} from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
    <div className='sidebar-options'>
      <NavLink  to="/add" className="sidebar-option">
        <img className='orderIcon' src={assets.add_icon_white} alt="Add Items" />
        <p>Add Items</p>
      </NavLink>
      <NavLink  to="/list" className="sidebar_option">
        <img  className='orderIcon' src={assets.order_icon} alt="List Items" />
        <p>List Items</p>
      </NavLink>
      <NavLink  to="/order" className="sidebar_option">
        <img  className='orderIcon' src={assets.order_icon} alt="Orders" />
        <p>Orders</p>
      </NavLink>
    </div>
    </div>
  );
};

export default Sidebar;
