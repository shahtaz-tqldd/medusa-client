import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "8.8.8.8";

    // Handle localhost development
    if (ip === "::1") {
      ip = "103.73.44.162";
    }

    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        "User-Agent": "Next.js App",
      },
    });

    if (!res.ok) {
      throw new Error(`IP API error: ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json({
      ip: data.ip,
      city: data.city,
      country: data.country_name,
      latitude: data.latitude,
      longitude: data.longitude,
    });
  } catch (error: any) {
    console.error("Location API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch location data" },
      { status: 500 }
    );
  }
}
