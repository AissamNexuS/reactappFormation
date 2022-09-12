import React from "react";
import Navbar from "../../components/sidebar/Sidebar";
import "./home.scss";
const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="HomeContainer">Container</div>
    </div>
  );
};
export default Home;
