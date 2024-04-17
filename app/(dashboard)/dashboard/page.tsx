"use client";
import { useClerk } from "@clerk/nextjs";
import SideBar from "./_components/SideBar";
import NavBar from "./_components/NavBar";
import { PlusCircle } from "lucide-react";

export default function Home() {
  const { user } = useClerk();
  return (
    <div className="h-full w-full flex relative">
      <SideBar />
      <NavBar />
      <div className="w-full ml-52 mt-14 ">
        <div className="p-7 bg-red-50  flex flex-col">
          {/* 上部タイトルとアイコン */}
          <div className="w-full bg-white flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">DashBoard</h1>
              <p className="text-muted-foreground/30 font-bold text-xs">
                Welcome back {user?.fullName}
              </p>
            </div>
            <PlusCircle size={30} />
          </div>
          <div className="h-12 bg-green-50" />
          {/* カードリスト */}
          <div></div>
        </div>
      </div>
    </div>
  );
}
