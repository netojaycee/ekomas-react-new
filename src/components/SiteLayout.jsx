// Layout.js
import React from 'react';
import Nav from './Navbar';
import Footer from './Footer';

const SiteLayout = ({ children }) => {
  return (
    <>
    <div className='min-h-screen overflow-hidden bg-gray-200'>
      <Nav />
      {children}
      <Footer />
      </div>
      </>
  );
};

export default SiteLayout;
