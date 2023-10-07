import "./Header.scss"
import logo from "../../assets/logo.png"
import React from 'react'

const Header = () => {
  return (
	<div className='header-container'>
		<div className="logo-container">
			<img src={logo} alt="Logo" className="logo"/>
			<span className="long-name"><span>C</span>omprehensive <span>O</span>perational <span>S</span>tandards & <span>M</span>anual <span>O</span>rganizational <span>S</span>ystem</span>
		</div>
		<hr></hr>
	</div>
  )
}

export default Header