import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export const revalidate = 60;

export default async function OutbondPage() {
  const packages = await prisma.package.findMany({
    where: { category: 'OUTBOND' },
    orderBy: { price: 'asc' }
  });

  return (
    <div className="container-responsive py-16 space-y-12">
      <header className="grid gap-6 md:grid-cols-[1.1fr,0.9fr] md:items-center">
        <div className="space-y-4">
          <p className="uppercase text-sm tracking-wide text-primary">Program Outbond</p>
          <h1 className="text-4xl font-display text-secondary">Team Building di Alam Gunung Muria</h1>
          <p className="text-gray-600 leading-relaxed">
            Arena outbond Taman Sardi memadukan hutan pinus, persawahan bertingkat, dan sungai alami. Fasilitator
            profesional siap menghidupkan semangat kolaborasi tim Anda melalui aktivitas high rope, low impact games,
            hingga fun race jelajah desa Colo.
          </p>
        </div>
        <div className="relative h-72 w-full overflow-hidden rounded-3xl shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
            alt="Outbond team building"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </header>
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-secondary">Paket Outbond Unggulan</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {packages.map((pkg) => (
            <article key={pkg.id} className="rounded-3xl border border-secondary/10 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-secondary">{pkg.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{pkg.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2 text-xs text-secondary/80">
                {pkg.facilities.map((facility) => (
                  <li key={facility} className="rounded-full bg-desert/70 px-3 py-1">
                    {facility}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-secondary">
                  Rp {pkg.price.toLocaleString('id-ID')} / pax
                </span>
                <span className="text-xs text-gray-500">Kapasitas {pkg.capacity ?? 'sesuai permintaan'}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="rounded-3xl bg-secondary/5 p-8">
        <h2 className="text-2xl font-semibold text-secondary">Aktivitas Pendukung</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2 text-sm text-gray-600">
          <li>Workshop Kopi Muria & meracik wedang rempah khas Kudus.</li>
          <li>Eksplorasi Air Terjun Monthel dan Bukit Pengorengan.</li>
          <li>Fun race jelajah desa, memetik sayur organik, dan membatik eco-print.</li>
          <li>Sesi refleksi tim di amphitheater alam dengan api unggun.</li>
        </ul>
      </section>
    </div>
  );
}
