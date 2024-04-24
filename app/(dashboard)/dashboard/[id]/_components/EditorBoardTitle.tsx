"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useContext, useState } from "react";

const EditorBoardHeader = ({ companyName }: { companyName: string }) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">{companyName}</h1>
        <div className="h-full"></div>
      </div>
    </div>
  );
};

export default EditorBoardHeader;
