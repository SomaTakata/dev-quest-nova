import { PlusCircle } from "lucide-react";
import React from "react";

const DashBoardHeader = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">DashBoard</h1>
        <p className="text-muted-foreground/30 font-bold text-xs">
          今日は2024年5月10日です
        </p>
      </div>
      <PlusCircle size={30} />
    </div>
  );
};

export default DashBoardHeader;
