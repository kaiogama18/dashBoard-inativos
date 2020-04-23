import Head from 'next/head';
import NavBarLeft from './NavBarLeft';
import PropTypes from 'prop-types';
import Navbar from './Navbar';

export default ({ children }) => {
  return (
    <>
      <main id="swup">
        <NavBarLeft />
        {children}
      </main>
    </>
  );
};
