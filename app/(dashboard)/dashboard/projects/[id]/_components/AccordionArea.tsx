import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Check, Loader2 } from "lucide-react";
import { mutate } from "swr";

export type TextAreaProps = {
  id: string;
  questionContent: string;
  answerContent: string;
  locked: boolean;
  indexNumber: number;
  newQuestionContent: string;
  setShowNewQuestion: (value: boolean) => void;
  setNewQuestionContent: (value: string) => void;
  handleDeepDiveQuestion: () => Promise<void>;
};

export type ButtonStateType = "available" | "loading" | "completed";
export type CardStateType = "indeterminate" | "completed";

export interface ButtonProperties {
  [key: string]: {
    text: string;
    disabled: boolean;
    icon?: JSX.Element;
  };
}

const AccordionArea = ({
  indexNumber,
  id,
  locked,
  answerContent,
  newQuestionContent,
  setShowNewQuestion,
  setNewQuestionContent,
  questionContent,
  handleDeepDiveQuestion,
}: TextAreaProps) => {
  const [inputValue, setInputValue] = useState<string>(
    newQuestionContent || "",
  );
  const [buttonState, setButtonState] = useState<ButtonStateType>("available");
  const [isActive, setIsActive] = useState(false);

  const separator = (
    <>
      <Separator className="mt-8" />
      <p className="font-medium mt-6 mb-4 ml-3">{questionContent}</p>
    </>
  );

  const buttonProperties: ButtonProperties = {
    available: {
      text: "質問を深掘る",
      disabled: !isActive,
    },
    loading: {
      text: "深掘り中",
      disabled: true,
      icon: <Loader2 className="mr-2 h-4 w-4 animate-spin" />,
    },
    completed: {
      text: "深堀完了",
      disabled: true,
      icon: <Check className="mr-2 h-4 w-4" />,
    },
  };

  useEffect(() => {
    setIsActive(inputValue.length > 0);
  }, [inputValue]);

  useEffect(() => {
    setNewQuestionContent(inputValue);
  }, [inputValue, setNewQuestionContent]);

  return (
    <div
      key={indexNumber}
      className="w-full relative flex flex-col px-6 pt-6 pb-4 rounded-lg  border border-card-foreground/10 bg-card shadow-md"
    >
      <Textarea
        className={`bg-[#FFFFFF] py-2`}
        placeholder="ESの質問を記入してください"
        value={inputValue}
        disabled={locked}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="flex justify-end mt-4">
        <Button
          className="w-full font-bold text-primary-foreground hover:bg-primary/90 bg-primary/80 border border-primary-foreground"
          disabled={locked}
          onClick={async () => {
            setButtonState("loading");
            await handleDeepDiveQuestion();
            setButtonState("completed");
            setShowNewQuestion(false);
          }}
        >
          {buttonProperties[buttonState].icon}
          {buttonProperties[buttonState].text}
        </Button>
      </div>
    </div>
  );
};

export default AccordionArea;
