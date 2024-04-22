"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { CreateProjectForm } from "./CreateProjectForm";

const DashBoardHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">DashBoard</h1>
        <p className="text-muted-foreground/30 font-bold text-xs">
          今日は2024年5月10日です
        </p>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <PlusCircle size={30} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-8">
          <DialogHeader className="mb-3">
            <DialogTitle>ESの情報を登録します</DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <CreateProjectForm setOpen={setOpen} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashBoardHeader;
