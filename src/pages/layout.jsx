import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

import { Outlet } from "react-router-dom";

const layout = () => {
  return (
    <div className="min-h-screen px-[10vw] bg-black grid grid-rows-[auto_1fr_auto]">
      <Header />
      <div className="flex flex-col items-center justify-center py-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default layout;
