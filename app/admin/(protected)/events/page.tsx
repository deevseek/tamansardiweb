import { EventsTable } from '@/components/tables/EventsTable';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminEventsPage() {
  const events = await prisma.eventRequest.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      package: true
    }
  });

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-display text-secondary">Permintaan Event</h1>
        <p className="text-sm text-gray-600">Kelola permintaan proposal dan ubah status konfirmasi event pengunjung.</p>
      </header>
      <EventsTable events={events} />
    </div>
  );
}
