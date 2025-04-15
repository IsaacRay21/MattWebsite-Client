import React, { useState } from "react";
import "./css/navbar.css"   
import { Link } from "react-router-dom";
import {FaBars} from "react-icons/fa"
import {HiXMark} from "react-icons/hi2"

export const Navbar = ()  => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to= "/"> MATT SULLIVAN</Link>
            </div>
            
            <div className="link-container">
                <ul className={`links ${isOpen ? "active" : ""}`}>
                    <li><Link to= "/photo"> PHOTO</Link> </li>
                    <li><Link to= "/audio"> AUDIO</Link></li>
                    <li><Link to= "/video"> VIDEO</Link></li>
                    <li><Link to= "/contact"> CONTACT</Link></li>
                </ul>
            
            </div>

            <div className="navbar-toggle">
                {isOpen ? <HiXMark onClick={toggleMenu}/>: <FaBars onClick={toggleMenu}/>}
            </div>
          
            
        </nav>
    )
}