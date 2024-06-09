import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } },
) {
  const supabase = createClient();
  const { projectId } = params;

  try {
    const { data: project, error } = await supabase
      .from("projects")
      .select(
        `
        *,
        questions (
          id,
          content,
          answer,
          checked,
          locked,
          created_at,
          subquestions (
            id,
            created_at,
            subsubquestions (
              id,
              question_content,
              answer_content,
              locked,
              important,
              created_at
            )
          )
        )
      `,
      )
      .eq("id", projectId)
      .single();

    if (error) {
      console.error("Error fetching project with questions:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { projectId: string } },
) {
  const supabase = createClient();
  const { projectId } = params;

  try {
    const { content, answer, checked, locked } = await req.json();

    const { data, error } = await supabase.from("questions").insert([
      {
        project_id: projectId,
        content,
        answer,
        checked: checked || false,
        locked: locked || false,
      },
    ]);

    if (error) {
      console.error("Error inserting question:", error.message);
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
