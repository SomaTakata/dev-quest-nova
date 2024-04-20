"use client";
import { useClerk } from "@clerk/nextjs";
import SideBar from "./_components/SideBar";
import NavBar from "./_components/NavBar";
import { PlusCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Home() {
  const { user } = useClerk();
  return (
    <div className="h-full w-full flex relative">
      <SideBar />
      <NavBar />
      <div className="-z-20 w-full h-full ml-52 mt-14 ">
        <div className="p-7 bg-muted/30 flex flex-col">
          {/* 上部タイトルとアイコン */}
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">DashBoard</h1>
              <p className="text-muted-foreground/30 font-bold text-xs">
                Welcome back {user?.fullName}
              </p>
            </div>
            <PlusCircle size={30} />
          </div>
          <div className="h-10 w-full" />
          {/* カードリスト */}
          <div className="  bg-slate-400 gap-4 grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5  ">
            <Card className=" h-56 w-full p-4"></Card>
            <Card className=" h-56 w-full p-4"></Card>
            <Card className=" h-56 w-full p-4"></Card>
            <Card className=" h-56 w-full p-4"></Card>
            <Card className=" h-56 w-full p-4"></Card>
            <Card className=" h-56 w-full p-4"></Card>
          </div>
        </div>
      </div>
    </div>
  );
}
