"use client";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="h-full w-full relative">
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
