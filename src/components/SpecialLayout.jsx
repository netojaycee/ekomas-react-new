// Layout.js
import React from 'react';
import Nav from './Navbar';
import Footer from './Footer';

const SpecialLayout = ({ children }) => {
  return (
    <>
    <div className='min-h-screen bg-background'>
      <Nav />
      {children}
      <Footer fullFooter={false} />
      </div>
      </>
  );
};

export default SpecialLayout;
