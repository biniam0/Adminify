// pages/api/chapa/callback.ts or app/api/chapa/callback/route.ts (depending on your Next.js version)

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const trx_ref = searchParams.get('trx_ref');
  const status = searchParams.get('status');
  const ref_id = searchParams.get('ref_id');

  console.log('Chapa callback received:', { trx_ref, status, ref_id });

  // Here you can perform additional verification or logging
  // The actual payment verification should be done on your return URL page

  return NextResponse.json({ 
    message: 'Callback received', 
    data: { trx_ref, status, ref_id } 
  });
}

export async function POST(request: NextRequest) {
  // Handle webhook if you've set it up
  try {
    const body = await request.json();
    console.log('Chapa webhook received:', body);

    // Verify the webhook signature if needed
    // Process the webhook data

    return NextResponse.json({ message: 'Webhook processed' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' }, 
      { status: 500 }
    );
  }
}