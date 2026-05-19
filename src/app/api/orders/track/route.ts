import { NextRequest, NextResponse } from 'next/server';
import { apiResponse } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json(
        apiResponse(false, 'Order ID or Email parameter is required'),
        { status: 400 }
      );
    }

    // In a production server, look up the order in MongoDB:
    // const order = await Order.findOne({ $or: [{ orderId: query }, { email: query }] });
    // if (!order) return response 404.

    const mockOrder = {
      orderId: query.toUpperCase().startsWith('PN-') ? query.toUpperCase() : 'PN-MOCK12',
      status: 1, // 'confirmed'
      trackingNumber: 'TRACK123456IN',
    };

    return NextResponse.json(apiResponse(true, 'Order status found', mockOrder));
  } catch (error: any) {
    return NextResponse.json(
      apiResponse(false, 'Failed to fetch order status', null, error.message),
      { status: 500 }
    );
  }
}
