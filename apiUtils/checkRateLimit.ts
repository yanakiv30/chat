import { NextResponse } from "next/server";

const rateLimitStore = new Map<string, number>();

export default async function checkRateLimit(request: Request): Promise<NextResponse | null> {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const lastRequest = rateLimitStore.get(ip) || 0;  
  if (now - lastRequest < 1000) { 
    return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });
  }  
  rateLimitStore.set(ip, now);
  return null;
}