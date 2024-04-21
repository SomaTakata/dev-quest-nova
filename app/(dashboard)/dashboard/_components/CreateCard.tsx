import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import React from "react";
import CardForm from "./CardForm";
import { Props } from "./CreateProjectForm";

const CreateCard = ({ open, setOpen }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-lg gap-3 p-6 border-[3px] bg-inherit border-muted-foreground/40 flex flex-col justify-center items-center hover:bg-muted-foreground/5">
          <p className="text-muted-foreground/40 text-xl font-bold">
            新しく作成する
          </p>
          <PlusCircle className="text-muted-foreground/40" size={36} />
        </div>
      </DialogTrigger>
      <CardForm open={open} setOpen={setOpen} />
    </Dialog>
  );
};

export default CreateCard;
