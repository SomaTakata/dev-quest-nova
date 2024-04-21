import SideBar from "../_components/SideBar";
import NavBar from "../_components/NavBar";
import { PlusCircle } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="h-full w-full flex relative">
      <SideBar />
      <NavBar />
      <div className="z-10 w-full h-full ml-52 pt-10  ">
        <div className="p-10   flex flex-col">
          {/* 上部タイトルとアイコン */}
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">DashBoard</h1>
              <p className="text-muted-foreground/30 font-bold text-xs">
                今日は2024年5月10日です
              </p>
            </div>
            <PlusCircle size={30} />
          </div>
          <div className="h-10 w-full " />
          {/* カードリスト */}
          <div className="gap-5 grid sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5  ">
            {/* カード */}
            <div className=" w-full p-6 rounded-lg border border-card-foreground/10 bg-card  shadow-md ">
              <div className="px-3">
                <div className="flex items-center justify-between mb-8">
                  <p className=" font-bold text-xl ">株式会社サポーターズ</p>
                  <Badge className="h-6 bg-green-400">提出済み</Badge>
                </div>
                <div className="flex  mb-2 gap-5 font-semibold items-center">
                  <p className=" text-sm text-primary  ">締め切り</p>
                  <p className="text-muted-foreground/50 text-sm ">あと10日</p>
                </div>

                <div className="flex mb-4 gap-5 items-center">
                  <p className="text-primary text-sm font-semibold">進捗</p>

                  <Progress value={33} className="h-3 w-[60%]" />
                  <p className="text-muted-foreground/50 text-sm font-semibold">
                    60%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
