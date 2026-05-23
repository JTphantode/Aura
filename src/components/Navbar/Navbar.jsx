import React from 'react'
import './Navbar.css'

const Navbar = ({ name, tier, logoUrl }) => {
  return (
    <nav>
      <div className='navDetails'>
        <img src={logoUrl} alt={`${name}'s avatar`} />
        <div className='detailsText'>
          <h2 className='detailsName'>Welcome, {name}</h2>
          <small className='detailsTier'>{tier}</small>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
