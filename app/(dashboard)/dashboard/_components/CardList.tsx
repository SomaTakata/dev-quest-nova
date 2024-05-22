import React, { ReactNode } from "react";
import CreateCard from "./CreateCard";

export const CardList = ({ children }: { children: ReactNode }) => {
  return (
    <div className="gap-5 grid sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4  ">
      <CreateCard />
      {children}
    </div>
  );
};
