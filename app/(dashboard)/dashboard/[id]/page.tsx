"use client";
import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../_components/SideBar";
import NavBar from "../../_components/NavBar";
import EditorBoardHeader from "./_components/EditorBoardTitle";
import { DataContext } from "../../layout";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { LoaderCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
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
  const [isLoading, setIsLoading] = useState(false);
  const [questionAI, setQuestionAI] = useState(true);
  const [questionOwn, setQuestionOwn] = useState(false);
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
                <div className="w-full px-7 font-bold">
                  問1）
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
                  <div className=" flex justify-between">
                    <Button
                      size="sm"
                      className={`bg-primary/70 gap-3 ${isLoading ? "w-full" : "w-1/2"}`}
                      onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => {
                          setIsLoading(false);
                          setQuestionAI((prev) => !prev);
                        }, 5000);
                      }}
                    >
                      {isLoading && (
                        <LoaderCircle className="animate-spin h-5 w-5" />
                      )}
                      質問を深堀する
                    </Button>

                    {!isLoading && (
                      <Button
                        size="sm"
                        className="w-[50%] bg-primary/70"
                        onClick={() => setQuestionOwn((prev) => !prev)}
                      >
                        そのまま記入する
                      </Button>
                    )}
                  </div>
                )}
                {questionAI && (
                  <div>
                    <p className="text-foreground/40 text-sm font-bold mb-2 tracking-wide">
                      以下の質問に回答してください。
                    </p>
                    <Accordion type="multiple">
                      <AccordionItem
                        value="item-1"
                        className={cn(
                          "bg-primary text-primary-foreground transition-color duration-200 hover:opacity-100 py-1 font-bold px-7 rounded-lg mt-1",
                        )}
                      >
                        <AccordionTrigger className="font-medium text-sm tracking-wide">
                          具体的にどのスキルや知識を身に着けたいですか？
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="mt-1">
                            <Textarea
                              className="p-2 text-muted-foreground text-sm font-semibold"
                              placeholder="回答を記入してください"
                              disabled
                              value="ありがとう"
                            />
                          </div>
                          <Separator className="mt-6 " />
                          <p className="font-medium my-3 tracking-wide">
                            {" "}
                            具体的にどのスキルや知識を身に着けたいですか？
                          </p>
                          <div className="mt-2">
                            <Textarea
                              className="p-2 text-muted-foreground text-sm font-semibold"
                              placeholder="回答を記入してください"
                            />

                            <div className="flex justify-end mt-3">
                              <Button
                                size="xs"
                                className="w-36 font-bold text-xs text-secondary border border-primary-foreground"
                              >
                                質問を深掘る
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
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
