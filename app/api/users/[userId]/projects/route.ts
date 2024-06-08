import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  const supabase = createClient();
  const { userId } = params;

  try {
    const { data: projects, error } = await supabase
      .from("Project")
      .select("projectId, companyName, deadline, createDate")
      .eq("userId", userId);

    if (error) {
      console.error("Error fetching projects:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  const supabase = createClient();
  const { userId } = params;

  try {
    const { companyName, projectId, deadline, url } = await request.json();

    const { data, error } = await supabase
      .from("Project")
      .insert([{ userId, projectId, companyName, deadline, url }]);

    if (error) {
      console.error("Error inserting project:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ projectId }, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
