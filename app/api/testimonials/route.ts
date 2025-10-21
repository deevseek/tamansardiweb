import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const created = await prisma.testimonial.create({
      data: {
        name: body.name,
        company: body.company,
        message: body.message,
        rating: Number(body.rating ?? 5)
      }
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menyimpan testimoni.' }, { status: 400 });
  }
}
