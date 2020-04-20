import Head from 'next/head';
import NavBarLeft from './NavBarLeft';
import PropTypes from 'prop-types';
import Navbar from './Navbar';

const Layout = ({ children }) => (
  <>
    <main className="flex w-ful bg-gray-100">
      <NavBarLeft />
      {children}
    </main>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
