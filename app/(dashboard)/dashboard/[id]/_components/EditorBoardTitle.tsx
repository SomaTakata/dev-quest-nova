"use client";

import { Progress } from "@/components/ui/progress";

interface EditorProps {
  companyName: string;
  deadline: string;
}

const EditorBoardHeader = ({ companyName, deadline }: EditorProps) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex flex-col w-[50%]">
        <h1 className="text-foreground text-3xl font-bold">{companyName}</h1>
        <p className="text-muted-foreground/50 font-bold text-sm">
          締め切りは{deadline}です
        </p>
      </div>
    </div>
  );
};

export default EditorBoardHeader;
