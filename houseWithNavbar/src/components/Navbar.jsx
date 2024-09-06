import React from 'react'
import './Navbar.css'

function Navbar({ sidebar, toggleSidebar, selectedData }) {
  return (
    <>
      <div className='navbar'></div>
      <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <h2 className='nav-title'>{selectedData.title}</h2>
        <p className='nav-desc'>{selectedData.description}</p>
      </div>
    </>
  );
}

export default Navbar;
