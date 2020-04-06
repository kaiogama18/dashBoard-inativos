import Head from "next/head";
import NavBarLeft from "./NavBarLeft";
import Navbar from "./Navbar";
import PropTypes from 'prop-types'

const Layout = ({ children }) => (
  // const { avatarUrl } = props.data;
  <>
    <Head>
      <title>Dashboard Inativos</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <script src="https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.js"></script>
    </Head>
    <main className="flex bg-gray-100">
      <NavBarLeft />
      <div className="w-screen h-screen p-6">
        <Navbar />
        {children}
      </div>
    </main>
  </>
);


Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;
