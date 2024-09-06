import React from 'react'
import './Navbar.css'
import { AiOutlineClose } from "react-icons/ai";

function Navbar({ sidebar, toggleSidebar, selectedData }) {
  return (
    <>
      <div className='navbar'></div>
      <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        { sidebar && (
         <button className='close-btn' onClick={toggleSidebar}>
         <AiOutlineClose /> {/* Correctly rendering the icon component */}
          </button>
        )}
        <div className='nav-content'>
        <h2 className='nav-title'>{selectedData.title}</h2>
        <p className='nav-desc'>{selectedData.description}</p>
        </div>
      </div>
    </>
  );
}

export default Navbar;
