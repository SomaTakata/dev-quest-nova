"use client";
import { useClerk } from "@clerk/nextjs";
import SideBar from "./_components/SideBar";
import NavBar from "./_components/NavBar";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  const { user } = useClerk();

  const [progress, setProgress] = useState(13);

  return (
    <div className="h-full w-full flex relative">
      <SideBar />
      <NavBar />
      <div className="z-10 w-full h-full ml-52 pt-10  ">
        <div className="p-10 bg-muted-foreground/15  flex flex-col">
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
          <div className="h-10 w-full " />
          {/* カードリスト */}
          <div className="gap-5 grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5  ">
            {/* カード */}
            <div className=" h-52 w-full px-4 pb-4 pt-3 rounded-lg border border-card bg-card  shadow-sm ">
              <div className="flex justify-end mb-1">
                <MoreHorizontal
                  size={22}
                  className="text-muted-foreground/50 "
                  onClick={() => ""}
                />
              </div>
              <div className="px-3">
                <p className=" font-bold text-xl mb-7">株式会社サポーターズ</p>
                <div className="flex  mb-2 gap-4 font-semibold items-center">
                  <p className=" text-sm text-accent-foreground  ">期限</p>
                  <p className="text-muted-foreground/50 text-sm ">
                    2024年11月11日
                  </p>
                </div>
                <div className="flex mb-8 gap-3 items-center">
                  <p className="text-accent-foreground text-sm font-semibold">
                    進捗
                  </p>

                  <Progress value={33} className="h-3 w-[80%]" />
                </div>
                <div className="text-right text-xs space-x-2 font-semibold">
                  <span className="text-accent-foreground ">作成日</span>
                  <span className="text-muted-foreground/50 ">
                    2024年11月11日
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
