"use client";
import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../_components/SideBar";
import NavBar from "../../_components/NavBar";
import EditorBoardHeader from "./_components/EditorBoardTitle";
import { DataContext } from "../../layout";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
interface ProjectItem {
  id: string;
  companyName: string;
  deadline: string;
  url: string;
}
const page = () => {
  const pathname = usePathname();
  const [values, setValues] = useState<ProjectItem[]>([]);
  const { value, setValue } = useContext(DataContext);
  const [questionAI, setQuestionAI] = useState(false);
  const [questionOwn, setQuestionOwn] = useState(true);
  console.log(value);
  useEffect(() => {
    if (value) {
      setValues(value);
    }
  }, [value]);
  const pathParts = pathname.split("/");
  const projectId = pathParts[2];

  const filteredProjects = values.filter((item) => item.id === projectId);
  console.log(filteredProjects[0]);
  console.log("questionAI =" + questionAI);
  console.log("questionOwn =" + questionOwn);

  return (
    <div className="h-full w-full flex relative">
      <SideBar />
      <NavBar />
      <div className="z-10 w-full  h-full ml-52 pt-10  ">
        <div className="p-10 flex flex-col">
          {/* 上部タイトルとアイコン */}
          <EditorBoardHeader
            companyName={filteredProjects[0]?.companyName}
            deadline={filteredProjects[0]?.deadline}
          />
          <div className="h-10 w-full " />
          <div className="">
            {/* <p className="text-foreground/70 text-lg font-bold mb-1 ml-2">
              質問
            </p> */}
            <div className="w-full relative flex flex-col p-8 rounded-lg border border-card-foreground/10 bg-card  shadow-md">
              <div className="">
                <Checkbox className="border-foreground absolute w-4 h-4 left-6 top-9" />
                <div className="w-full px-7 text-sm font-bold">
                  問1)
                  MIXIのインターンシップで挑戦してみたいことや目的、目標を教えてください(500文字以内)*
                </div>
                <Trash2
                  className="text-foreground/30
                w-5 h-5 absolute right-6 top-8 "
                />
              </div>
              <div className="px-7">
                <div className="h-8 w-full" />

                {!questionAI && !questionOwn && (
                  <div className="gap-4 flex justify-between">
                    <Button
                      size="sm"
                      className="w-[50%] bg-primary/70"
                      onClick={() => setQuestionAI((prev) => !prev)}
                    >
                      質問を深堀する
                    </Button>
                    <Button
                      size="sm"
                      className="w-[50%] bg-primary/70"
                      onClick={() => setQuestionOwn((prev) => !prev)}
                    >
                      そのまま記入する
                    </Button>
                  </div>
                )}
                {questionAI && <div>AIを深堀する</div>}
                {questionOwn && (
                  <Textarea
                    placeholder="入力をしてください。"
                    className="border-foreground focus-visible:border-input"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
