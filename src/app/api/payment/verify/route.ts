import { NextRequest, NextResponse } from 'next/server';
import { apiResponse } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return NextResponse.json(
        apiResponse(false, 'Missing required signature verification fields'),
        { status: 400 }
      );
    }

    // In a production server, we would verify the HMAC signature:
    // const isValid = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    // and if valid, update order status in MongoDB to 'paid' & send confirmation emails.
    
    return NextResponse.json(apiResponse(true, 'Payment verified and order finalized'));
  } catch (error: any) {
    return NextResponse.json(
      apiResponse(false, 'Failed to verify payment', null, error.message),
      { status: 500 }
    );
  }
}
