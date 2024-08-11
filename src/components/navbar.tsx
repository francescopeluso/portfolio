import React from 'react';

// import components
import NavbarLink from './navbarlink';
import SocialLink from './sociallink';

// import styles
import '../styles/App.css';
import '../styles/Navbar.css';

// import assets
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { PiPlanetFill } from "react-icons/pi";
import NCage from '../images/ncage-easteregg.png';

const Navbar = () => {

  // i'll make a π% chance to show Nicholas Cage's face, just for fun lol
  const showCage = Math.random() < Math.PI/100;
  if (showCage)
    console.log("🎉 You found Nicholas Cage!");

  return (
    <nav className="navbar">
      
      <div className="navbar-logo">
        {showCage ? <img src={NCage} style={{width: 32}} alt="Nicholas Cage face" /> : <PiPlanetFill />}
      </div>
      
      <div className='navbar-links'>
        <NavbarLink to="#home" label="Home" />
        <NavbarLink to="#aboutme" label="About me" />
        <NavbarLink to="#experience" label="Experience" />
        <NavbarLink to="#projects" label="Projects" />
        <NavbarLink to="#connect" label="Let's connect" />
      </div>

      <div className='navbar-socials'>
        <SocialLink to="https://www.linkedin.com/in/francescopeluso04/" icon={FaLinkedin} name="LinkedIn" />
        <SocialLink to="https://www.github.com/francescopeluso" icon={FaGithub} name="GitHub" />
      </div>
      
    </nav>
  );
}

export default Navbar;