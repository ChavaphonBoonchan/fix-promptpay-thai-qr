import { NextResponse } from "next/server";
import { generatePromptPayQrPng } from "@/lib/qr";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";
import { validateQrParams } from "@/lib/validation";

export const runtime = "nodejs";

function rateLimitHeaders(result: ReturnType<typeof checkRateLimit>) {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
  };
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
  };
}

export async function GET(request: Request) {
  const ip = clientIp(request);
  const limit = checkRateLimit(ip);

  if (!limit.allowed) {
    const retryAfter = Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000));
    const message =
      limit.reason === "capacity"
        ? "เซิร์ฟเวอร์ไม่ว่าง กรุณาลองใหม่ในอีกสักครู่"
        : "เกินโควต้าแล้ว สูงสุด 20 ครั้งต่อนาทีต่อ IP";

    return NextResponse.json(
      { error: message },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders(limit),
          ...corsHeaders(),
          "Retry-After": String(retryAfter),
        },
      },
    );
  }

  const { searchParams } = new URL(request.url);
  const parsed = validateQrParams(
    searchParams.get("type"),
    searchParams.get("target"),
    searchParams.get("amount"),
  );

  if (!parsed.ok) {
    return NextResponse.json(
      { error: parsed.error },
      {
        status: parsed.status,
        headers: {
          ...rateLimitHeaders(limit),
          ...corsHeaders(),
        },
      },
    );
  }

  try {
    const png = await generatePromptPayQrPng(
      parsed.type,
      parsed.target,
      parsed.amount,
    );

    return new NextResponse(new Uint8Array(png), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        ...corsHeaders(),
        ...rateLimitHeaders(limit),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "สร้าง QR ไม่สำเร็จ" },
      {
        status: 500,
        headers: {
          ...rateLimitHeaders(limit),
          ...corsHeaders(),
        },
      },
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...corsHeaders(),
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}
