import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../index.css'

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 fixed w-full top-0 z-10">
      <div className="flex justify-between text-xl md:mx-20 mx-2">
        <Link to="/">
        <div>
        <div className="text-2xl font-semibold text-white animate-bounce ">InterraIT</div>
          <div className='h-1 w-22 bg-white '></div>
        </div>
        </Link>
        <div className="flex md:gap-8 gap-4  text-gray-50">
          <NavLink to="/">
            Add 
          </NavLink>

          <NavLink to="/all">
           All 
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
