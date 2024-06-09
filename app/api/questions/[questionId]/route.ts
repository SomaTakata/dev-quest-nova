import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(
  req: NextRequest,
  { params }: { params: { projectId: string; questionId: string } },
) {
  const supabase = createClient();
  const { questionId } = params;

  try {
    const { data, error } = await supabase
      .from("questions")
      .delete()
      .eq("id", questionId);

    if (error) {
      console.error("Error deleting question:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
