"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import SideBar from "../_components/SideBar";
import NavBar from "../_components/NavBar";
import Card from "./_components/Card";
import { CardList } from "./_components/CardList";
import DashBoardHeader from "./_components/DashBoardTitle";
import { DataContext } from "../layout";
import { usePathname } from "next/navigation";

interface ProjectItem {
  id: string;
  companyName: string;
  deadline: string;
  url: string;
}

interface UserOpenType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const UserOpen = createContext<UserOpenType>({
  open: false,
  setOpen: () => {},
});

export default function Home() {
  const pathname = usePathname();
  const [values, setValues] = useState<ProjectItem[]>([]);
  const { value } = useContext(DataContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }
        const data = await response.json();

        const formattedData = data.projects.map((project: any) => ({
          id: project.id,
          companyName: project.companyName,
          deadline: project.deadline,
          url: `/projects/${project.id}`,
        }));

        setValues(formattedData);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    }

    fetchProjects();
  }, []);

  const openValue = {
    open,
    setOpen,
  };

  return (
    <div className="h-full w-full flex relative">
      <UserOpen.Provider value={openValue}>
        <SideBar />
        <NavBar />
        <div className="z-10 w-full h-full ml-52 pt-10">
          <div className="p-10 flex flex-col">
            <DashBoardHeader />
            <div className="h-10 w-full" />
            <CardList>
              {values.map((item) => (
                <Card
                  key={item.id}
                  companyName={item.companyName}
                  deadline={item.deadline}
                  url={item.url}
                  id={item.id}
                />
              ))}
            </CardList>
          </div>
        </div>
      </UserOpen.Provider>
    </div>
  );
}
