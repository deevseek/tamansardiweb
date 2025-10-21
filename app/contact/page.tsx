import { BookingForm } from '@/components/BookingForm';
import { prisma } from '@/lib/prisma';

export const revalidate = 60;

export default async function ContactPage() {
  const packages = await prisma.package.findMany({ orderBy: { title: 'asc' } });

  return (
    <div className="container-responsive py-16 space-y-12">
      <header className="space-y-3 text-center">
        <h1 className="text-4xl font-display text-secondary">Hubungi Taman Sardi</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ceritakan konsep acara, jumlah peserta, serta kebutuhan khusus Anda. Tim reservasi kami siap membantu menyusun
          pengalaman terbaik berlatar keindahan Gunung Muria.
        </p>
      </header>
      <div className="grid gap-10 md:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-3xl border border-secondary/10 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-secondary mb-4">Permintaan Proposal</h2>
          <BookingForm packages={packages.map((pkg) => ({ id: pkg.id, title: pkg.title }))} />
        </div>
        <aside className="rounded-3xl border border-secondary/10 bg-secondary/5 p-6 space-y-6">
          <section>
            <h3 className="text-lg font-semibold text-secondary">Informasi Kontak</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>Reservasi: +62 812-3456-7890 (WhatsApp)</li>
              <li>Email: reservasi@tamansardi.id</li>
              <li>Alamat: Desa Colo, Dawe, Kudus, Jawa Tengah</li>
            </ul>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-secondary">Jam Operasional</h3>
            <p className="mt-2 text-sm text-gray-600">Senin - Minggu, 07.00 - 21.00 WIB</p>
            <p className="text-xs text-gray-500">Reservasi event khusus bisa dilakukan di luar jam operasional.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-secondary">Lokasi</h3>
            <iframe
              title="Peta Taman Sardi"
              className="mt-3 h-52 w-full rounded-2xl border border-secondary/20"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.162712348737!2d110.921!3d-6.695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDEnNDIuMCJTIDExMMKwNTUnMTUuNiJF!5e0!3m2!1sid!2sid!4v1700000000000"
              loading="lazy"
              allowFullScreen
            />
          </section>
        </aside>
      </div>
    </div>
  );
}
