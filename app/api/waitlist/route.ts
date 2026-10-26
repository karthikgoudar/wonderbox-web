import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, role, ageGroup, timestamp } = body;

    // Logs directly in Vercel Runtime Logs immediately
    console.log('[WONDERBOX WAITLIST LEAD]:', { email, role, ageGroup, timestamp });

    // Optional: Add a Google Apps Script Webhook URL in Vercel env vars (GOOGLE_SHEET_WEBHOOK_URL)
    // to automatically append every lead into a Google Sheet in karthik@wonderboxai.com's Drive!
    if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
      await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role, ageGroup, timestamp }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
