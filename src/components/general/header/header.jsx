import React, { useState } from 'react';
import './header.css';
import Navbar from './navbar';
import NavbarMenu from './navbar-menu';
import LogoLink from './logolink';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="icon"
        type="image/x-icon"
        href="https://img.freepik.com/free-vector/deer-colorful-gradient-style-vector-design_343694-1474.jpg?size=626&ext=jpg"
      />
      <nav className="navbar">
        <LogoLink />
        <Navbar toggleMenu={toggleMenu} />
        <NavbarMenu isMenuOpen={isMenuOpen} />
      </nav>
    </>
  );
}
