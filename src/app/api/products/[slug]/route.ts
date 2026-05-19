import { NextRequest, NextResponse } from 'next/server';
import { apiResponse } from '@/lib/utils';

const DEMO_PRODUCTS = [
  {
    _id: '1',
    title: 'SSC CGL Complete Maths Notes',
    slug: 'ssc-cgl-maths',
    examCategory: 'SSC',
    subject: 'Mathematics',
    format: 'Both',
    price: 29900,
    originalPrice: 49900,
    coverImage: '',
    description: '<p>Complete mathematics notes covering all topics for SSC CGL examination. Includes Number System, Algebra, Geometry, Arithmetic and Data Interpretation with practice sets.</p>',
    previewImages: [],
    inStock: true
  },
  {
    _id: '2',
    title: 'UPSC Prelims Indian Polity',
    slug: 'upsc-polity',
    examCategory: 'UPSC',
    subject: 'Polity',
    format: 'PDF',
    price: 19900,
    originalPrice: 29900,
    coverImage: '',
    description: '<p>Complete indian polity syllabus for civil services preparation including quick charts, revision notes and chapter summaries.</p>',
    previewImages: [],
    inStock: true
  }
];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = DEMO_PRODUCTS.find(p => p.slug === slug);

    if (!product) {
      return NextResponse.json(
        apiResponse(false, 'Product not found'),
        { status: 404 }
      );
    }

    return NextResponse.json(apiResponse(true, 'Product details found', product));
  } catch (error: any) {
    return NextResponse.json(
      apiResponse(false, 'Failed to fetch product details', null, error.message),
      { status: 500 }
    );
  }
}
