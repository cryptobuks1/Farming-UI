import React from 'react';
import './Navbar.scss';
import Logo from './Images/logo.png';

const Navbar = ({ account }) => {
  return (
    <div className='navbarContainer'>
      <img src={Logo} alt='Company Logjo' height='20px' />

      <button className='accBtn'>
        <div className='acc'>{account}</div>
      </button>
    </div>
  );
};

export default Navbar;
