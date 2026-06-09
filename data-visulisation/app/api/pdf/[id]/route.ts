import { NextRequest, NextResponse } from "next/server";
import { getPaperById } from "@/app/lib/data-fetcher";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id || typeof id !== "string") {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const paper = await getPaperById(id);

  if (!paper?.pdf_url) {
    return new NextResponse(`PDF not found: ${id}.pdf`, { status: 404 });
  }

  return NextResponse.redirect(paper.pdf_url);
}
