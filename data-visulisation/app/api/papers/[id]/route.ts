import { getPaperById } from "@/app/lib/data-fetcher";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    if (!id || typeof id !== "string") {
        return NextResponse.json({ error: "Invalid paper id" }, { status: 400 });
    }

    const paper = await getPaperById(id);

    if (!paper) {
        return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }

    return NextResponse.json(paper, {
        headers: {
            "Cache-Control": "private, max-age=300",
        },
    });
}
