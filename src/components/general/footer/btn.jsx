import './footer.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Btn({ to, src, alt }) {
  return (
    <Link to={to} className="footer__container-btn">
      <img src={src} alt={alt} className="footer__container-img" />
    </Link>
  );
}

export default Btn;
