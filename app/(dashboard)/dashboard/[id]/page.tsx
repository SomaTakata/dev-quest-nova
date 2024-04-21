import React from "react";
import SideBar from "../../_components/SideBar";
import NavBar from "../../_components/NavBar";

const page = () => {
  return (
    <div className="h-full w-full flex relative">
      <SideBar />
      <NavBar />
      <div className="z-10 w-full h-full ml-52 pt-10  ">Edit Page</div>
    </div>
  );
};

export default page;
