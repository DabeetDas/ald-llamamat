import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id || typeof id !== "string") {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const pdfPath = path.join(
    process.cwd(),
    "..",
    "Web Scrapper",
    "ald_papers_naming",
    `${id}.pdf`
  );

  if (!fs.existsSync(pdfPath)) {
    return new NextResponse(`PDF not found: ${id}.pdf`, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(pdfPath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${id}.pdf"`,
      "Content-Length": fileBuffer.length.toString(),
    },
  });
}
