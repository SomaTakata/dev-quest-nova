"use client";
import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import CardForm from "./CardForm";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateCard = () => {
  const [open, setOpen] = useState(false);
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
      <CardForm setOpen={setOpen} />
    </Dialog>
  );
};

export default CreateCard;
