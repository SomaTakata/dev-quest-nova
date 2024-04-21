import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import React from "react";
interface ProjectItem {
  companyName: string;
  deadline: string;
  url: string;
}
const Card = ({ companyName, deadline, url }: ProjectItem) => {
  const calculateDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  // Calculate days remaining to display
  const daysUntilDeadline = calculateDaysUntilDeadline(deadline);
  return (
    <div className=" w-full p-7 rounded-lg border border-card-foreground/10 bg-card  shadow-md ">
      <div className="px-3">
        <div className="flex items-center justify-between mb-7">
          <p className=" font-bold text-xl ">{companyName}</p>
          <Badge className="h-6 bg-green-400">提出済み</Badge>
        </div>
        <div className="flex  mb-2 gap-5 font-semibold items-center">
          <p className=" text-sm text-primary  ">締め切り</p>
          <p className="text-muted-foreground/50 text-sm ">
            あと{daysUntilDeadline}日
          </p>
        </div>

        <div className="flex mb-4 gap-5 items-center">
          <p className="text-primary text-sm font-semibold">進捗</p>

          <Progress value={33} className="h-3 w-[60%]" />
          <p className="text-muted-foreground/50 text-sm font-semibold">60%</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
