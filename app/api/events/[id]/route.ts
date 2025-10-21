import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { EventStatus } from '@prisma/client';

interface Params {
  params: { id: string };
}

export async function PUT(request: Request, { params }: Params) {
  const body = await request.json();
  try {
    const updated = await prisma.eventRequest.update({
      where: { id: Number(params.id) },
      data: {
        status: body.status as EventStatus,
        message: body.message ?? undefined,
        date: body.date ? new Date(body.date) : undefined
      }
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal memperbarui event.' }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await prisma.eventRequest.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menghapus event.' }, { status: 400 });
  }
}
