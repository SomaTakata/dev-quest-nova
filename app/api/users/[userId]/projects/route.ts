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
      .from("projects")
      .select("id, company_name, deadline, created_at")
      .eq("user_id", userId);

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
    const { id, company_name, deadline, url } = await request.json();

    const { data, error } = await supabase
      .from("projects")
      .insert([{ id, user_id: userId, company_name, deadline, url }]);

    if (error) {
      console.error("Error inserting project:", error.message);
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
