import Layout from "../components/Layout";
import Link from "next/link";
const Home = () => (
  <Layout>
    <div class="area"></div>
    <nav class="main-menu">
      <ul>
        <li>
          <a>
            <i class="fa fa-home fa-2x"></i>
            <span class="nav-text">Safra</span>
          </a>
        </li>
      </ul>
    </nav>
  </Layout>
);
export default Home;
