const stats = [
  { value: '12 ha', label: 'Kawasan Wisata Alam' },
  { value: '300+', label: 'Event & Gathering Berhasil' },
  { value: '6', label: 'Unit Villa & Glamping' },
  { value: '500 pax', label: 'Kapasitas Hall Terintegrasi' }
];

export function StatsBar() {
  return (
    <section className="bg-white py-12 shadow-inner">
      <div className="container-responsive grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-3xl text-secondary">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
