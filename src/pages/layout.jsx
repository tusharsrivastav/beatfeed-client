import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

import { Outlet } from "react-router-dom";

const layout = () => {
  return (
    <>
      <Header />
      <div className="outlet-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default layout;
