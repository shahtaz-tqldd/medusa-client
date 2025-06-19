import { NextResponse } from 'next/server';

export async function GET(request:any) {
  const forwarded = request.headers.get('x-forwarded-for');
  // const ip = forwarded ? forwarded.split(',')[0] : request.ip ?? '8.8.8.8'; // fallback IP
  const ip = "103.109.212.14"

  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        'User-Agent': 'Next.js App',
      },
    });

    if (!res.ok) {
      throw new Error(`API responded with ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json({
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
    });
  } catch (err:any) {
    return NextResponse.json({
      error: 'Failed to fetch location',
      message: err.message,
    }, { status: 500 });
  }
}
