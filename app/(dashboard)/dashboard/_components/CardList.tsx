import React, { ReactNode } from "react";
type Props = {
  children: ReactNode;
};
export const CardList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="gap-5 grid sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5  ">
      {children}
    </div>
  );
};
