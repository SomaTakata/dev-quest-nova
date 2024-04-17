"use client";
import { Button } from "@/components/ui/button";

import { ArrowDown, Ghost } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-full w-full relative">
      <nav className="z-10 fixed w-full h-16 bg-primary text-primary-foreground py-5 px-6 flex items-center justify-between">
        <Link href="/" className="flex gap-2 items-center">
          <Ghost className="h-6 w-6" />
          <h1 className="font-bold ">Dev Quest</h1>
        </Link>

        <Button
          variant="secondary"
          onClick={() => router.push("/sign-in")}
          size="sm"
          className="font-bold px-6"
        >
          Sign In
        </Button>
      </nav>
      <div className="">
        <section className="h-screen flex items-center justify-center flex-col gap-9">
          <div className=" flex gap-5 ">
            <Ghost className="h-16 w-16 text-primary" />
            <h2 className="font-bold text-6xl  pb-3 ">DevQuest</h2>
          </div>
          <Link href="#introduce">
            <ArrowDown className="h-16 w-16 animate-bounce duration-1000 text-muted-foreground" />
          </Link>
        </section>
        <section
          className="h-screen flex items-center justify-center flex-col bg-primary"
          id="introduce"
        >
          <h2 className="font-bold text-6xl  pb-3 text-secondary">
            AI × 自己分析 × ES
          </h2>
        </section>
        <section className="h-screen flex items-center justify-center flex-col ">
          <div className="w-fit ">
            <h2 className="font-bold text-6xl  pb-3 text-foreground mb-8">
              Let's Try DevQuest
            </h2>
            <Button
              variant="default"
              onClick={() => router.push("/sign-in")}
              size="lg"
              className=" w-full text-lg"
            >
              Sign In
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
