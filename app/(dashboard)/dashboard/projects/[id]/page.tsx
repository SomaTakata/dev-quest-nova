"use client";
import React, { useState } from "react";
import SideBar from "../../../_components/SideBar";
import NavBar from "../../../_components/NavBar";
import EditorBoardHeader from "./_components/EditorBoardTitle";
import { useParams } from "next/navigation";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@clerk/nextjs";
import useSWR, { mutate } from "swr";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import AccordionArea from "./_components/AccordionArea";

interface ProjectItem {
  id: string;
  company_name: string;
  deadline: string;
  url: string;
  questions: QuestionItem[];
}

interface QuestionItem {
  id: string;
  content: string;
  answer: string;
  checked: boolean;
  locked: boolean;
  created_at: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Page = () => {
  const [showNewQuestion, setShowNewQuestion] = useState(true); // 新しい質問の表示制御用
  const [newQuestionContent, setNewQuestionContent] = useState(""); // 新しい質問の内容
  const { userId, isLoaded } = useAuth();
  const { id } = useParams<{ id: string }>();

  const { data, error } = useSWR<{ project: ProjectItem }>(
    `/api/projects/${id}/questions`,
    fetcher,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [questionAI, setQuestionAI] = useState(true);
  const [questionOwn, setQuestionOwn] = useState(false);

  if (error) return <div>Failed to load project data</div>;
  if (!data) return <div>Loading...</div>;

  const project = data.project;
  const questions = project.questions || []; // デフォルトで空の配列を設定

  const handleAddQuestion = async () => {
    if (!isLoaded || !userId) {
      console.error("User ID is not loaded or available");
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newQuestionContent,
          answer: "",
          checked: false,
          locked: true,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to create question");
      }

      // SWRキャッシュを更新
      mutate(`/api/projects/${id}/questions`);
      setShowNewQuestion(false); // 新しい質問の入力欄を隠す
      setNewQuestionContent(""); // 新しい質問の内容をリセット
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleDeepDiveQuestion = async () => {
    setIsLoading(true);
    try {
      await handleAddQuestion();
      setQuestionAI(true);
    } catch (error) {
      console.error("Error during deep dive:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex relative">
      <SideBar />
      <NavBar />
      <div className="z-10 w-full h-full ml-52 pt-10">
        <div className="p-10 flex flex-col">
          {/* 上部タイトルとアイコン */}
          {project && (
            <EditorBoardHeader
              company_name={project.company_name}
              deadline={project.deadline}
            />
          )}
          <div className="h-8 w-full" />
          <div className="space-y-6 flex flex-col">
            {questions.length > 0 &&
              questions.map((question, index) => (
                <div className="w-full relative flex flex-col p-6 rounded-lg  border border-card-foreground/10 bg-card shadow-md">
                  <div key={question.id} className="">
                    <div className="w-full px-7 font-bold items-center">
                      {question.content}
                      <Trash2 className="text-foreground/30 w-5 h-5 absolute right-6 top-8 " />
                    </div>
                    <div className="px-7">
                      <div className="h-8 w-full" />
                      {questionAI && (
                        <div className="gap-8">
                          <p className="text-foreground/40 text-sm font-bold mb-2">
                            以下の質問に回答してください。
                          </p>
                          <Accordion type="multiple">
                            <AccordionItem
                              value="item-1"
                              className={cn(
                                "bg-primary text-primary-foreground transition-color duration-200 hover:opacity-100 py-1 font-bold px-7 rounded-lg mt-1",
                              )}
                            >
                              <AccordionTrigger className="font-medium text-sm">
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
                                <p className="font-medium my-3 ">
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
                                      className=" font-bold text-xs text-secondary border border-primary-foreground "
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
                    </div>
                  </div>
                </div>
              ))}
            {showNewQuestion && (
              <AccordionArea
                indexNumber={questions.length}
                id=""
                locked={false}
                answerContent=""
                newQuestionContent={newQuestionContent}
                setShowNewQuestion={setShowNewQuestion}
                setNewQuestionContent={setNewQuestionContent}
                handleDeepDiveQuestion={handleDeepDiveQuestion}
                questionContent="新しい質問を入力してください"
              />
            )}
          </div>
          {questions.length > 0 && !showNewQuestion && (
            <div className="flex justify-end">
              <Button
                size="xs"
                className="mt-6 bg-[#FFFFFF] text-primary hover:text-[#FFFFFF] border border-primary hover:bg-primary"
                onClick={() => setShowNewQuestion(true)} // ボタンをクリックで新しい質問の入力欄を表示
              >
                <Plus className="mr-2 h-4 w-4" />
                質問を追加
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
