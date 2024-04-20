"use client";

import { useClerk, UserButton } from "@clerk/nextjs";
import React from "react";

const NavBar = () => {
  const { user } = useClerk();
  return (
    <nav className="fixed -z-10 top-0  w-full h-14 bg-white text-primary-foreground py-2 px-6 flex items-center justify-end">
      <UserButton />
      <p className="text-muted-foreground mr-4 ml-3 text-sm">
        {user?.fullName}
      </p>
    </nav>
  );
};

export default NavBar;
