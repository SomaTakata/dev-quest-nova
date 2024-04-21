"use client";
import SideBar from "../_components/SideBar";
import NavBar from "../_components/NavBar";
import { PlusCircle } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Card from "./_components/Card";
import { CardList } from "./_components/CardList";
import DashBoardHeader from "./_components/DashBoardTitle";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div className="h-full w-full flex relative">
      <SideBar />
      <NavBar />
      <div className="z-10 w-full h-full ml-52 pt-10  ">
        <div className="p-10   flex flex-col">
          {/* 上部タイトルとアイコン */}
          <DashBoardHeader open={open} setOpen={setOpen} />
          <div className="h-10 w-full " />
          {/* カードリスト */}
          <CardList open={open} setOpen={setOpen}>
            {/* カード */}
            <Card />
          </CardList>
        </div>
      </div>
    </div>
  );
}
