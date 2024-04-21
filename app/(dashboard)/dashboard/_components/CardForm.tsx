import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { CreateProjectForm } from "./CreateProjectForm";
interface Props {
  setOpen: (open: boolean) => void;
}

const CardForm = ({ setOpen }: Props) => {
  return (
    <DialogContent className="sm:max-w-[425px] p-8">
      <DialogHeader className="mb-3">
        <DialogTitle>ESの情報を登録します</DialogTitle>
      </DialogHeader>
      <div className="w-full">
        <CreateProjectForm setOpen={setOpen} />
      </div>
    </DialogContent>
  );
};

export default CardForm;
