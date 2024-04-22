"use client";
import SideBar from "../_components/SideBar";
import NavBar from "../_components/NavBar";
import Card from "./_components/Card";
import { CardList } from "./_components/CardList";
import DashBoardHeader from "./_components/DashBoardTitle";
import { useLocalStorage } from "react-use";
import Link from "next/link";
import { createContext, useEffect, useState } from "react";

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
  open: false, // 初期値としてfalseを設定
  setOpen: () => {}, // 空の関数を設定
});

export default function Home() {
  const [values, setValues] = useState<ProjectItem[]>([]);

  useEffect(() => {
    const data = window.localStorage.getItem("test");
    if (data) {
      try {
        setValues(JSON.parse(data));
      } catch (error) {
        console.error("Parsing error:", error);
        setValues([]);
      }
    }
  }, []);

  // console.log(value);
  const [open, setOpen] = useState(false);
  const value = {
    open,
    setOpen,
  };
  return (
    <div className="h-full w-full flex relative">
      <UserOpen.Provider value={value}>
        <SideBar />
        <NavBar />
        <div className="z-10 w-full h-full ml-52 pt-10  ">
          <div className="p-10   flex flex-col">
            {/* 上部タイトルとアイコン */}
            <DashBoardHeader />
            <div className="h-10 w-full " />
            {/* カードリスト */}
            <CardList>
              {/* カード */}
              {values?.map((item) => {
                console.log(item);
                return (
                  <Card
                    key={item.id}
                    companyName={item.companyName}
                    deadline={item.deadline}
                    url={item.url}
                    id={item.id}
                  />
                );
              })}
            </CardList>
          </div>
        </div>
      </UserOpen.Provider>
    </div>
  );
}
