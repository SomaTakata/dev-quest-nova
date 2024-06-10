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
  project_id: string;
  answer: string;
  checked: boolean;
  locked: boolean;
  created_at: string;
  subquestions: SubQuestion[];
}

interface SubQuestion {
  id: string;
  content: string;
  answer: string;
  created_at: string;
  subsubquestions: SubSubQuestion[];
}

interface SubSubQuestion {
  id: string;
  subquestion_id: string;
  question_content: string;
  answer_content: string;
  locked: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Page = () => {
  const [showNewQuestion, setShowNewQuestion] = useState(false); // 新しい質問の表示制御用
  const [newQuestionContent, setNewQuestionContent] = useState(""); // 新しい質問の内容
  const { userId, isLoaded } = useAuth();
  const { id } = useParams<{ id: string }>();

  const { data, error } = useSWR<{ project: ProjectItem }>(
    `/api/projects/${id}`,
    fetcher,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [questionAI, setQuestionAI] = useState(true);
  const [questionOwn, setQuestionOwn] = useState(false);

  if (error) return <div>Failed to load project data</div>;
  if (!data) return <div>Loading...</div>;

  const project = data?.project;
  const questions = project?.questions || [];

  console.log(questions);

  const handleAddQuestion = async () => {
    if (!isLoaded || !userId) {
      console.error("User ID is not loaded or available");
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
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
      mutate(`/api/projects/${id}`);
      setShowNewQuestion(false); // 新しい質問の入力欄を隠す
      setNewQuestionContent(""); // 新しい質問の内容をリセット
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unexpected error", error);
      }
    }
  };

  const handleAddSubSubQuestion = async (subquestionId: string) => {
    if (!isLoaded || !userId) {
      console.error("User ID is not loaded or available");
      return;
    }

    try {
      const response = await fetch(`/api/subquestions/${subquestionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question_content: "具体的にどのスキルや知識を身に着けたいですか？",
          answer_content: "",
          locked: false,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.error || "Failed to create subsubquestion",
        );
      }

      // SWRキャッシュを更新
      mutate(`/api/projects/${id}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unexpected error", error);
      }
    }
  };
  const handleDeepDiveSubSubQuestion = async (subquestionId: string) => {
    setIsLoading(true);
    try {
      await handleAddSubSubQuestion(subquestionId);
      setQuestionAI(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during deep dive:", error.message);
      } else {
        console.error("Unexpected error during deep dive", error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeepDiveQuestion = async () => {
    setIsLoading(true);
    try {
      await handleAddQuestion();
      setQuestionAI(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during deep dive:", error.message);
      } else {
        console.error("Unexpected error during deep dive", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      const response = await fetch(`/api/questions/${questionId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to delete question");
      }

      // SWRキャッシュを更新
      mutate(`/api/projects/${id}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unexpected error", error);
      }
    }
  };

  return (
    <div className="h-full w-full flex relative">
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
                <div
                  key={question.id}
                  className="w-full relative flex flex-col p-6 rounded-lg border border-card-foreground/10 bg-card shadow-md"
                >
                  <div className="">
                    <div className="w-full px-7 font-bold items-center">
                      {question.content}
                      <Trash2
                        className="hover:text-red-300 text-foreground/30 w-5 h-5 absolute right-6 top-8 cursor-pointer"
                        onClick={() => handleDeleteQuestion(question.id)}
                      />
                    </div>
                    <div className="px-7">
                      <div className="h-8 w-full" />
                      {questionAI && (
                        <div className="gap-8">
                          <p className="text-foreground/40 text-sm font-bold mb-2">
                            以下の質問に回答してください。
                          </p>
                          <div className="flex flex-col gap-2">
                            {question.subquestions.map((subquestion) => (
                              <Accordion key={subquestion.id} type="multiple">
                                <AccordionItem
                                  value="item-1"
                                  className={cn(
                                    "bg-primary text-primary-foreground transition-color duration-200 hover:opacity-100 py-1 font-bold px-7 rounded-lg mt-1",
                                  )}
                                >
                                  <AccordionTrigger className="font-medium text-sm">
                                    {
                                      subquestion.subsubquestions[0]
                                        .question_content
                                    }
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="mt-1">
                                      <Textarea
                                        className="p-2 text-muted-foreground text-sm font-semibold"
                                        placeholder="回答を記入してください"
                                        disabled
                                        value={
                                          subquestion.subsubquestions[0]
                                            .answer_content || ""
                                        }
                                      />
                                    </div>
                                    {subquestion.subsubquestions
                                      .slice(1)
                                      .map((subsubquestion) => (
                                        <div key={subsubquestion.id}>
                                          <Separator className="mt-6 " />
                                          <p className="font-medium my-3 ">
                                            {subsubquestion.question_content}
                                          </p>
                                          <div className="mt-2">
                                            <Textarea
                                              className="p-2 text-muted-foreground text-sm font-semibold"
                                              placeholder="回答を記入してください"
                                            />
                                          </div>
                                        </div>
                                      ))}
                                    {subquestion.subsubquestions.length ===
                                      3 && <div className="h-6 w-full" />}
                                    {subquestion.subsubquestions.length < 3 && (
                                      <div className="flex justify-end mt-3">
                                        <Button
                                          size="xs"
                                          className=" font-bold text-xs text-secondary border border-primary-foreground "
                                          onClick={() =>
                                            handleDeepDiveSubSubQuestion(
                                              subquestion.id,
                                            )
                                          }
                                        >
                                          質問を深掘る
                                        </Button>
                                      </div>
                                    )}
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            {questions.length === 0 && (
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
