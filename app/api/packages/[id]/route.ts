import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Params {
  params: { id: string };
}

export async function PUT(request: Request, { params }: Params) {
  const body = await request.json();
  try {
    const updated = await prisma.package.update({
      where: { id: Number(params.id) },
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
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal memperbarui paket.' }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await prisma.package.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menghapus paket.' }, { status: 400 });
  }
}
