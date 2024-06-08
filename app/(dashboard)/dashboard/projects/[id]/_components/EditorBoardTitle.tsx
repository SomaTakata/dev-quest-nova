import React from "react";

interface EditorProps {
  company_name: string;
  deadline: string;
}

const calculateDaysLeft = (deadline: string) => {
  const deadlineDate = new Date(deadline);
  const currentDate = new Date();
  const timeDiff = deadlineDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); // ミリ秒を日数に変換
  return daysLeft;
};

const EditorBoardHeader = ({ company_name, deadline }: EditorProps) => {
  const daysLeft = calculateDaysLeft(deadline);

  return (
    <div className="flex flex-col w-[50%]">
      <h1 className="text-foreground text-3xl font-bold">{company_name}</h1>
      <p className="text-muted-foreground/50 font-bold text-sm">
        締め切りまであと{daysLeft}日です
      </p>
    </div>
  );
};

export default EditorBoardHeader;
