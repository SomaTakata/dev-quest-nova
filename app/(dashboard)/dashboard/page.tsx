"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import SideBar from "../_components/SideBar";
import NavBar from "../_components/NavBar";
import Card from "./_components/Card";
import { CardList } from "./_components/CardList";
import DashBoardHeader from "./_components/DashBoardTitle";
import { useAuth } from "@clerk/nextjs";

interface ProjectItem {
  projectId: string;
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
  const [values, setValues] = useState<ProjectItem[]>([]);
  const [open, setOpen] = useState(false);
  const { userId, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded || !userId) return; // userIdが取得できない場合、処理を中断

    async function fetchProjects() {
      try {
        const response = await fetch(`/api/users/${userId}/projects`);
        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }
        const data = await response.json();

        const formattedData = data.projects.map((project: any) => ({
          projectId: project.projectId,
          companyName: project.companyName,
          deadline: project.deadline,
          url: `/projects/${project.projectId}`,
        }));

        setValues(formattedData);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    }

    fetchProjects();
  }, [isLoaded, userId]); // userIdが変更されたときにのみ再実行

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
                  key={item.projectId}
                  companyName={item.companyName}
                  deadline={item.deadline}
                  url={item.url}
                  id={item.projectId}
                />
              ))}
            </CardList>
          </div>
        </div>
      </UserOpen.Provider>
    </div>
  );
}
