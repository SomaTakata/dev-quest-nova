import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { CreateProjectForm, Props } from "./CreateProjectForm";

const CardForm = ({ open, setOpen }: Props) => {
  return (
    <DialogContent className="sm:max-w-[425px] p-8">
      <DialogHeader className="mb-3">
        <DialogTitle>ESの情報を登録します</DialogTitle>
      </DialogHeader>
      <div className="w-full">
        <CreateProjectForm open={open} setOpen={setOpen} />
      </div>
    </DialogContent>
  );
};

export default CardForm;
