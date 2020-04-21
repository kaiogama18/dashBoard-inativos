import Head from 'next/head';
import NavBarLeft from './NavBarLeft';
import PropTypes from 'prop-types';
import Navbar from './Navbar';

export default ({ children }) => {
  return (
    <>
      <main id="swup" className="flex w-ful bg-gray-100 transition-fade">
        <NavBarLeft />
        {children}
      </main>
    </>
  );
};
