import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export const revalidate = 60;

export default async function HallPage() {
  const halls = await prisma.package.findMany({
    where: { category: 'HALL' },
    orderBy: { price: 'asc' }
  });

  return (
    <div className="container-responsive py-16 space-y-12">
      <header className="grid gap-6 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <p className="uppercase text-sm tracking-wide text-primary">Hall Serbaguna</p>
          <h1 className="text-4xl font-display text-secondary">Sardi Pavilion untuk Momen Berkelas</h1>
          <p className="text-gray-600 leading-relaxed">
            Hall semi-outdoor dengan atap tinggi dan dinding kaca yang menampilkan lanskap alam Taman Sardi. Cocok
            untuk rapat korporasi, resepsi pernikahan, peluncuran produk, hingga konser akustik intim.
          </p>
        </div>
        <div className="relative h-72 w-full overflow-hidden rounded-3xl shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Hall serbaguna"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        {halls.map((hall) => (
          <article key={hall.id} className="rounded-3xl border border-secondary/10 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-secondary">{hall.title}</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{hall.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2 text-xs text-secondary/80">
              {hall.facilities.map((facility) => (
                <li key={facility} className="rounded-full bg-desert/70 px-3 py-1">
                  {facility}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-semibold text-secondary">
                Rp {hall.price.toLocaleString('id-ID')} / sesi
              </span>
              <span className="text-xs text-gray-500">Kapasitas {hall.capacity ?? 'hingga 500 pax'}</span>
            </div>
          </article>
        ))}
      </section>
      <section className="rounded-3xl bg-secondary/5 p-8">
        <h2 className="text-2xl font-semibold text-secondary">Fasilitas Hall</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2 text-sm text-gray-600">
          <li>Sound system line-array dan lighting profesional.</li>
          <li>Ruang rias pengantin dan lounge VIP.</li>
          <li>Opsional catering buffet dengan menu khas Kudus.</li>
          <li>Area parkir luas dan akses shuttle internal.</li>
        </ul>
      </section>
    </div>
  );
}
