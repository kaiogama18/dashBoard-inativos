import Head from "next/head";
import NavBarLeft from "./NavBarLeft";
import Navbar from "./Navbar";

const Layout = props => (
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
      {props.children}
    </main>
  </>
);

export default Layout;
