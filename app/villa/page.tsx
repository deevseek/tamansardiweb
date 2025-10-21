import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export const revalidate = 60;

export default async function VillaPage() {
  const villas = await prisma.package.findMany({
    where: { category: 'VILLA' },
    orderBy: { price: 'asc' }
  });

  return (
    <div className="container-responsive py-16 space-y-12">
      <header className="grid gap-6 md:grid-cols-[0.9fr,1.1fr] md:items-center">
        <div className="relative h-72 w-full overflow-hidden rounded-3xl shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1496412705862-e0088f16f791"
            alt="Villa pegunungan"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="space-y-4">
          <p className="uppercase text-sm tracking-wide text-primary">Villa & Glamping</p>
          <h1 className="text-4xl font-display text-secondary">Menginap di Tengah Pinus dan Kabut Pagi</h1>
          <p className="text-gray-600 leading-relaxed">
            Pilih villa kayu modern atau glamping dome dengan teras panorama. Setiap unit dilengkapi fasilitas makan
            pagi tradisional, api unggun malam hari, dan aktivitas tambahan seperti kelas yoga atau workshop kopi.
          </p>
        </div>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        {villas.map((villa) => (
          <article key={villa.id} className="rounded-3xl border border-secondary/10 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-secondary">{villa.title}</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{villa.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2 text-xs text-secondary/80">
              {villa.facilities.map((facility) => (
                <li key={facility} className="rounded-full bg-desert/70 px-3 py-1">
                  {facility}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-semibold text-secondary">
                Rp {villa.price.toLocaleString('id-ID')} / malam
              </span>
              <span className="text-xs text-gray-500">Kapasitas {villa.capacity ?? 'keluarga'}</span>
            </div>
          </article>
        ))}
      </section>
      <section className="rounded-3xl bg-secondary/5 p-8">
        <h2 className="text-2xl font-semibold text-secondary">Pengalaman Menginap</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2 text-sm text-gray-600">
          <li>Api unggun dan BBQ dengan menu sate kerbau dan wedang tahu khas Kudus.</li>
          <li>Kelas yoga sunrise di deck kayu berlatar Gunung Muria.</li>
          <li>Tur kebun kopi dan sesi cupping bersama petani lokal.</li>
          <li>Paket honeymoon dengan dekorasi bunga lokal dan privat dining.</li>
        </ul>
      </section>
    </div>
  );
}
