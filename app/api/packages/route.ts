import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const packages = await prisma.package.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(packages);
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const created = await prisma.package.create({
      data: {
        title: body.title,
        category: body.category,
        description: body.description,
        facilities: body.facilities ?? [],
        duration: body.duration ?? null,
        capacity: body.capacity ?? null,
        price: Number(body.price),
        imageUrl: body.imageUrl ?? null
      }
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menyimpan paket.' }, { status: 400 });
  }
}
