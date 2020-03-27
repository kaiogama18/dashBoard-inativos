import Header from "./Header";
import NavBar from "./NavBar";

import '../styles/styles.css'

const Layout = props => (
  <>
    <main>{props.children}</main>
  </>
);

export default Layout;
