import Head from 'next/head';
import PropTypes from 'prop-types';
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
