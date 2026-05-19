import { NextRequest, NextResponse } from 'next/server';
import { apiResponse, generateOrderId } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Verify basic checkout inputs
    if (!data.name || !data.email || !data.items || data.items.length === 0) {
      return NextResponse.json(
        apiResponse(false, 'Full customer info and item lists are required'),
        { status: 400 }
      );
    }

    const orderId = generateOrderId();

    // In a production server, we would insert this into MongoDB and trigger Nodemailer confirmation emails.
    // e.g.:
    // const newOrder = await Order.create({ ...data, orderId });

    return NextResponse.json(
      apiResponse(true, 'Order created successfully', { orderId })
    );
  } catch (error: any) {
    return NextResponse.json(
      apiResponse(false, 'Checkout failed to finalize', null, error.message),
      { status: 500 }
    );
  }
}
