"use client";
import React, { useState } from "react";
import SideBar from "../../../_components/SideBar";
import NavBar from "../../../_components/NavBar";
import EditorBoardHeader from "./_components/EditorBoardTitle";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@clerk/nextjs";
import useSWR, { mutate } from "swr";
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
  const [showNewQuestion, setShowNewQuestion] = useState(false); // 新しい質問の表示制御用
  const [newQuestionContent, setNewQuestionContent] = useState(""); // 新しい質問の内容
  const { userId, isLoaded } = useAuth();

  const { id } = useParams<{ id: string }>();

  const { data, error } = useSWR<{ project: ProjectItem }>(
    `/api/projects/${id}/questions`,
    fetcher,
  );

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
          locked: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create question");
      }

      const newQuestion = await response.json();

      // SWRキャッシュを更新
      mutate(`/api/projects/${id}/questions`);
      setShowNewQuestion(false); // 新しい質問の入力欄を隠す
      setNewQuestionContent(""); // 新しい質問の内容をリセット
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(project);

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
          <div className="">
            <div className="w-full relative flex flex-col p-6 rounded-lg border border-card-foreground/10 bg-card shadow-md">
              {questions.length > 0 ? (
                questions.map((question, index) => (
                  <AccordionArea
                    key={question.id}
                    indexNumber={index}
                    id={question.id}
                    locked={question.locked}
                    answerContent={question.answer}
                    questionContent={question.content}
                  />
                ))
              ) : (
                <AccordionArea
                  indexNumber={0}
                  id=""
                  locked={false}
                  answerContent=""
                  questionContent="新しい質問を入力してください"
                />
              )}

              {showNewQuestion && (
                <div className="mt-4">
                  <Textarea
                    placeholder="新しい質問を入力してください。"
                    className="border-foreground focus-visible:border-input"
                    value={newQuestionContent}
                    onChange={(e) => setNewQuestionContent(e.target.value)}
                  />
                  <Button
                    className="mt-4 bg-primary text-white"
                    onClick={handleAddQuestion}
                  >
                    質問を追加
                  </Button>
                </div>
              )}
              {/* <div className="flex justify-start">
                <Button
                  className="mt-6 bg-[#FFFFFF] text-primary hover:text-[#FFFFFF] border border-primary"
                  onClick={() => setShowNewQuestion(true)} // ボタンをクリックで新しい質問の入力欄を表示
                >
                  <Plus className="mr-2 h-4 w-4" />
                  質問を追加
                </Button>
              </div> */}
            </div>
            {questions.length > 0 && (
              <div className="flex justify-end">
                <Button
                  className="mt-6 bg-[#FFFFFF] text-primary hover:text-[#FFFFFF] border border-primary"
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
    </div>
  );
};

export default Page;
