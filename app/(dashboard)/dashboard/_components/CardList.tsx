import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import React, { ReactNode } from "react";
import { CreateProjectForm } from "./CreateProjectForm";
import CardForm from "./CardForm";
import CreateCard from "./CreateCard";
interface Props {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const CardList = ({ children, open, setOpen }: Props) => {
  return (
    <div className="gap-5 grid sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4  ">
      <CreateCard open={open} setOpen={setOpen} />
      {children}
    </div>
  );
};
