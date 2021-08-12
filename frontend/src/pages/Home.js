import "../Main-home.css";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "../component";

import { HotItem, Logo, Banner } from "../component";
const Home = () => {
  return (
    <>
      <NavBar />
      <div className="container-home">
        <div className="cover">
          <Logo />
        </div>
      </div>
      <div class="hot-item">
        <h1>New Products</h1>
        <HotItem />
      </div>
      <Banner />
    </>
  );
};

export default Home;
