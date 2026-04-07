import React from "react";
import SideNavBar from "./SideNavBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const AdminLayout = () => {
  return (
    <div>
      <SideNavBar />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AdminLayout;
