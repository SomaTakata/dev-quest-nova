"use client";

import { UserButton } from "@clerk/nextjs";
import React from "react";

const NavBar = () => {
  return (
    <nav className="absolute -z-10 top-0  w-full h-14 bg-muted/50 text-primary-foreground py-2 px-6 flex items-center justify-end">
      <UserButton />
    </nav>
  );
};

export default NavBar;
