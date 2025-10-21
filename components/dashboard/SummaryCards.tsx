interface SummaryData {
  packages: number;
  testimonials: number;
  pendingEvents: number;
  confirmedEvents: number;
}

export function SummaryCards({ summary }: { summary: SummaryData }) {
  const items = [
    {
      label: 'Paket Aktif',
      value: summary.packages,
      description: 'Jumlah paket wisata yang tampil di website.'
    },
    {
      label: 'Testimoni',
      value: summary.testimonials,
      description: 'Cerita pengalaman pengunjung Taman Sardi.'
    },
    {
      label: 'Permintaan Baru',
      value: summary.pendingEvents,
      description: 'Reservasi event yang menunggu tindak lanjut.'
    },
    {
      label: 'Event Terjadwal',
      value: summary.confirmedEvents,
      description: 'Event yang sudah dikonfirmasi tim reservasi.'
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-secondary/10 bg-desert/40 p-6 shadow-inner"
        >
          <p className="text-sm font-medium text-secondary/70">{item.label}</p>
          <p className="mt-3 text-3xl font-display text-secondary">{item.value}</p>
          <p className="mt-2 text-xs text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
