import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Forward to your FastAPI backend
  const backendRes = await fetch("http://localhost:8000/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await backendRes.json();

  return NextResponse.json(data);
}
