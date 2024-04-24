"use client";
import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../_components/SideBar";
import NavBar from "../../_components/NavBar";
import DashBoardHeader from "../_components/DashBoardTitle";
import EditorBoardHeader from "./_components/DashBoardTitle";
import { DataContext } from "../../layout";
import { usePathname } from "next/navigation";
interface ProjectItem {
  id: string;
  companyName: string;
  deadline: string;
  url: string;
}
const page = () => {
  const pathname = usePathname();
  const [values, setValues] = useState<ProjectItem[]>([]);
  const { value, setValue } = useContext(DataContext);
  console.log(value);
  useEffect(() => {
    if (value) {
      setValues(value);
    }
  }, [value]);
  const pathParts = pathname.split("/");
  const projectId = pathParts[2];

  const filteredProjects = values.filter((item) => item.id === projectId);
  console.log(filteredProjects[0]);

  return (
    <div className="h-full w-full flex relative">
      <SideBar />
      <NavBar />
      <div className="z-10 w-full h-full ml-52 pt-10  ">
        <div className="p-10   flex flex-col">
          {/* 上部タイトルとアイコン */}
          <EditorBoardHeader companyName={filteredProjects[0]?.companyName} />
        </div>
      </div>
    </div>
  );
};

export default page;
