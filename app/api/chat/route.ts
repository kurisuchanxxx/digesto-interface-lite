import { NextRequest, NextResponse } from "next/server";

const backendBaseUrl = process.env.BACKEND_URL?.replace(/\/$/, "");

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!backendBaseUrl) {
    return NextResponse.json(
      {
        error:
          "Variabile BACKEND_URL non configurata. Impostala per utilizzare il proxy /api/chat.",
      },
      { status: 500 },
    );
  }

  const targetUrl = `${backendBaseUrl}/chat`;

  try {
    const body = await request.json();
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const authorization = request.headers.get("authorization");
    if (authorization) {
      headers.set("authorization", authorization);
    }

    const backendResponse = await fetch(targetUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const responseText = await backendResponse.text();
    const responseHeaders = new Headers();
    const contentType = backendResponse.headers.get("content-type");

    if (contentType) {
      responseHeaders.set("content-type", contentType);
    }

    return new NextResponse(responseText, {
      status: backendResponse.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy /api/chat error", error);
    return NextResponse.json(
      { error: "Impossibile contattare il backend Digesto AI" },
      { status: 502 },
    );
  }
}
