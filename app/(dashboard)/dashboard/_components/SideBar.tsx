"use client";

import React from "react";
import {
  Ghost,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useClerk, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { signOut, user } = useClerk();

  console.log(pathname);
  return (
    <div className="absolute left-0 w-52 bg-primary flex flex-col rounded-r-xl h-full">
      <div
        onClick={() => router.push("/dashboard")}
        className={cn(
          "text-white cursor-pointer font-medium flex gap-4 pl-10  mt-10",
        )}
      >
        <Ghost className="h-6 w-6" />
        <div className="text-white font-bold">Dev Quest</div>
      </div>
      <div className="h-full flex items-center w-full">
        <div className="flex flex-col  text-sm w-full mb-14">
          <div
            onClick={() => router.push("/dashboard")}
            className={cn(
              "bg-primary  flex gap-4 cursor-pointer items-center pl-10 py-4 hover:bg-violet-500",
              pathname === "/dashboard"
                ? "bg-violet-500 font-bold text-white "
                : "text-violet-100",
            )}
          >
            <LayoutDashboard className="h-5 w-5" />
            <div>Dashboard</div>
          </div>
          <div
            onClick={() => router.push("/history")}
            className={cn(
              "text-white bg-primary  flex gap-4 cursor-pointer items-center pl-10 py-4 hover:bg-violet-500",
              pathname === "/history"
                ? "bg-violet-500 font-bold text-white"
                : "text-violet-300",
            )}
          >
            <History className="h-5 w-5" />
            <div>History</div>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col mb-4 mt-20 text-sm pl-10">
        <div
          onClick={() => router.push("/setting")}
          className={cn(
            " flex gap-4 cursor-pointer items-center pl-10 py-3 hover:bg-violet-500 text-violet-300 hover:text-white",
          )}
        >
          <Settings className="h-5 w-5" />
        </div>
        <div
          onClick={() => signOut(() => router.push("/sign-in"))}
          className={cn(
            " text-sm flex cursor-pointer gap-6 items-center pl-14  py-3 hover:bg-violet-500 text-violet-300 hover:text-white",
          )}
        >
          <LogOut className="h-4 w-4" />
          <div className="sm">Logout</div>
        </div>
      </div> */}
    </div>
  );
};

export default SideBar;
