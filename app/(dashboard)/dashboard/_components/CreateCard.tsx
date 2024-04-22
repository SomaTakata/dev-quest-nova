"use client";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import CardForm from "./CardForm";
import { UserOpen } from "../page";

const CreateCard = () => {
  const { open, setOpen } = useContext(UserOpen);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="h-[178px] rounded-lg gap-3 p-6 border-[3px] bg-inherit border-muted-foreground/40 flex flex-col justify-center items-center hover:bg-muted-foreground/5">
          <p className="text-muted-foreground/40 text-xl font-bold">
            新しく作成する
          </p>
          <PlusCircle className="text-muted-foreground/40" size={36} />
        </div>
      </DialogTrigger>
      <CardForm />
    </Dialog>
  );
};

export default CreateCard;
