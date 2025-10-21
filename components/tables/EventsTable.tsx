'use client';

import { EventRequest, EventStatus, Package } from '@prisma/client';
import useSWR from 'swr';

interface EventWithPackage extends EventRequest {
  package: Package;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const statusLabel: Record<EventStatus, string> = {
  PENDING: 'Menunggu',
  CONFIRMED: 'Terkonfirmasi',
  CANCELLED: 'Dibatalkan'
};

export function EventsTable({ events: initial }: { events: EventWithPackage[] }) {
  const { data, mutate } = useSWR<EventWithPackage[]>('/api/events', fetcher, {
    fallbackData: initial
  });

  const updateStatus = async (id: number, status: EventStatus) => {
    await fetch(`/api/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });
    mutate();
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-secondary/20 text-secondary/70">
            <th className="py-3 pr-4">Pemesan</th>
            <th className="py-3 pr-4">Kontak</th>
            <th className="py-3 pr-4">Paket</th>
            <th className="py-3 pr-4">Tanggal</th>
            <th className="py-3 pr-4">Status</th>
            <th className="py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((event) => (
            <tr key={event.id} className="border-b border-secondary/10">
              <td className="py-3 pr-4 font-medium text-secondary">
                <div>{event.name}</div>
                {event.message && <p className="text-xs text-gray-500 max-w-xs">{event.message}</p>}
              </td>
              <td className="py-3 pr-4 text-secondary/80">
                <p>{event.email}</p>
                <p>{event.phone}</p>
              </td>
              <td className="py-3 pr-4 text-secondary/80">{event.package.title}</td>
              <td className="py-3 pr-4 text-secondary/80">
                {new Date(event.date).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </td>
              <td className="py-3 pr-4 text-secondary/80">{statusLabel[event.status]}</td>
              <td className="py-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => updateStatus(event.id, 'CONFIRMED')}
                  className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white hover:bg-secondary"
                >
                  Konfirmasi
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(event.id, 'CANCELLED')}
                  className="rounded-full bg-red-500 px-4 py-1 text-xs font-semibold text-white hover:bg-red-600"
                >
                  Batalkan
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
