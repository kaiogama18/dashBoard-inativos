import Head from 'next/head';
import NavBarLeft from './NavBarLeft';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { Sidebar } from '.';

export default ({ children }) => {
  return (
    <>
      <main id="swup">
        <Sidebar />
        {children}
      </main>
    </>
  );
};
