import { NextRequest, NextResponse } from 'next/server';
import { apiResponse } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { amount, receipt } = await req.json();

    if (!amount || !receipt) {
      return NextResponse.json(
        apiResponse(false, 'Amount and receipt are required fields'),
        { status: 400 }
      );
    }

    // In a production server, we would call:
    // const order = await createRazorpayOrder(amount, receipt);
    // and return the real order details. For standard test runs:
    const mockOrder = {
      id: `rzp_${Math.random().toString(36).substring(2, 12)}`,
      amount,
      currency: 'INR',
      receipt,
    };

    return NextResponse.json(apiResponse(true, 'Payment order created', mockOrder));
  } catch (error: any) {
    return NextResponse.json(
      apiResponse(false, 'Failed to create payment order', null, error.message),
      { status: 500 }
    );
  }
}
