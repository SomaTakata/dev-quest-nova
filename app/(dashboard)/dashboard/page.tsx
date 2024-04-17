"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Ghost } from "lucide-react";
import Link from "next/link";
import SideBar from "./_components/SideBar";
import NavBar from "./_components/NavBar";

export default function Home() {
  return (
    <div className="h-full w-full flex relative">
      <SideBar />
      <div className="w-full">
        <NavBar />
      </div>
    </div>
  );
}
