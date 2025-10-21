import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const events = await prisma.eventRequest.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      package: true
    }
  });
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const body = await request.json();
  const packageId = Number(body.packageId);

  if (!body.name || !body.email || !body.phone || !body.date || !packageId) {
    return NextResponse.json({ error: 'Lengkapi seluruh kolom permintaan event.' }, { status: 400 });
  }

  try {
    const created = await prisma.eventRequest.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        date: new Date(body.date),
        message: body.message ?? null,
        packageId
      }
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengirim permintaan event.' }, { status: 400 });
  }
}
