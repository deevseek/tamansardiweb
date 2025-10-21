import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Params {
  params: { id: string };
}

export async function PUT(request: Request, { params }: Params) {
  const body = await request.json();
  try {
    const updated = await prisma.testimonial.update({
      where: { id: Number(params.id) },
      data: {
        name: body.name,
        company: body.company,
        message: body.message,
        rating: Number(body.rating)
      }
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal memperbarui testimoni.' }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await prisma.testimonial.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menghapus testimoni.' }, { status: 400 });
  }
}
