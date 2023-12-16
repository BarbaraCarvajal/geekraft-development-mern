import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='bg-purple p-3 footer'>
      <div className='footer-content'>
        <h2 className='text-center footer-h1'>Geekraft</h2>
      </div>
      <p className='text-center mt-3'>
        <Link to='/about' className='text-white'>
          Sobre Nosotros
        </Link>
        <Link to='/contact' className='text-white'>
          Contacto
        </Link>
        <Link to='/policy' className='text-white'>
          Politicas de envío y entregas
        </Link>
      </p>
    </div>
  );
};

export default Footer;
