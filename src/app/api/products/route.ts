import { NextRequest, NextResponse } from 'next/server';
import { apiResponse } from '@/lib/utils';

const DEMO_PRODUCTS = [
  { _id: '1', title: 'SSC CGL Complete Maths Notes', slug: 'ssc-cgl-maths', examCategory: 'SSC', subject: 'Mathematics', format: 'Both', price: 29900, originalPrice: 49900, coverImage: '', inStock: true },
  { _id: '2', title: 'UPSC Prelims Indian Polity', slug: 'upsc-polity', examCategory: 'UPSC', subject: 'Polity', format: 'PDF', price: 19900, originalPrice: 29900, coverImage: '', inStock: true },
  { _id: '3', title: 'Railway Group D GK + GS', slug: 'railway-gk-gs', examCategory: 'Railway', subject: 'General Knowledge', format: 'Printed', price: 34900, originalPrice: 49900, coverImage: '', inStock: true },
  { _id: '4', title: 'Banking Reasoning Master Notes', slug: 'banking-reasoning', examCategory: 'Banking', subject: 'Reasoning', format: 'PDF', price: 14900, originalPrice: 24900, coverImage: '', inStock: true },
  { _id: '5', title: 'SSC CHSL English Grammar & Vocab', slug: 'ssc-chsl-english', examCategory: 'SSC', subject: 'English', format: 'Both', price: 24900, originalPrice: 39900, coverImage: '', inStock: true },
  { _id: '6', title: 'UPSC Mains History Optional', slug: 'upsc-history', examCategory: 'UPSC', subject: 'History', format: 'Printed', price: 44900, originalPrice: 69900, coverImage: '', inStock: true },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const format = searchParams.get('format');

    let products = DEMO_PRODUCTS;

    if (category) {
      products = products.filter(p => p.examCategory.toLowerCase() === category.toLowerCase());
    }

    if (format) {
      products = products.filter(p => p.format.toLowerCase() === format.toLowerCase());
    }

    return NextResponse.json(apiResponse(true, 'Products retrieved successfully', products));
  } catch (error: any) {
    return NextResponse.json(
      apiResponse(false, 'Failed to fetch products', null, error.message),
      { status: 500 }
    );
  }
}
