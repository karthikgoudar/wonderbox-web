import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, role, ageGroup, timestamp } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { ok: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const leadData = {
      email: email.trim().toLowerCase(),
      role: role || 'parent',
      ageGroup: role === 'parent' ? ageGroup || '6-8' : 'N/A',
      timestamp: timestamp || new Date().toISOString(),
    };

    // Log immediately in Vercel Serverless runtime logs
    console.log('[NEW WONDERBOX WAITLIST LEAD]:', leadData);

    // Forward to Google Apps Script Webhook (Google Sheets + Gmail notification)
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData),
          redirect: 'follow', // Google Apps Script web apps return 302 redirects
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
      } catch (webhookErr) {
        // Log webhook error without failing the user response
        console.error('[WAITLIST WEBHOOK ERROR]:', webhookErr);
      }
    }

    return NextResponse.json({ ok: true, message: 'Waitlist spot locked in.' });
  } catch (error) {
    console.error('[WAITLIST SUBMIT ERROR]:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
