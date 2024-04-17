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
          <div className="h-11 bg-green-500 w-full" />
          {/* カードリスト */}
          <div
            className="  bg-slate-400 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3
      xl:grid-cols-3 2xl:grid-cols-5 gap-7"
          >
            <Card className=" h-56 w-80 p-4"></Card>
            <Card className=" h-56 w-80 p-4"></Card>
            <Card className=" h-56 w-80 p-4"></Card>
            <Card className=" h-56 w-80 p-4"></Card>
            <Card className=" h-56 w-80 p-4"></Card>
            <Card className=" h-56 w-80 p-4"></Card>
            <Card className=" h-56 w-80 p-4"></Card>
            <Card className=" h-56 w-80 p-4"></Card>
            <Card className=" h-56 w-80 p-4"></Card>
            <Card className=" h-56 w-80 p-4"></Card>
          </div>
        </div>
      </div>
    </div>
  );
}
