import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { subquestionId: string } },
) {
  const supabase = createClient();
  const { subquestionId } = params;

  try {
    const { question_content, answer_content, locked } = await req.json();

    const { data, error } = await supabase.from("subsubquestions").insert([
      {
        sub_question_id: subquestionId,
        question_content,
        answer_content,
        locked: locked || false,
      },
    ]);

    if (error) {
      console.error("Error inserting subsubquestion:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
