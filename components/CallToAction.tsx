import Link from 'next/link';

export function CallToAction() {
  return (
    <section className="container-responsive my-20 rounded-3xl bg-secondary px-8 py-14 text-white shadow-xl">
      <div className="grid gap-6 md:grid-cols-[2fr,1fr] md:items-center">
        <div className="space-y-4">
          <p className="uppercase text-sm tracking-wide text-accent">Siap Menyelenggarakan Event</p>
          <h2 className="font-display text-3xl md:text-4xl">
            Buat Proposal Kunjungan Anda dan Tim Rancang Detailnya Bersama Kami
          </h2>
          <p className="text-white/80">
            Konsultan event kami akan membantu menyusun rundown, akomodasi, konsumsi, hingga aktivitas tambahan
            seperti jelajah desa dan workshop kopi Muria.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-white px-6 py-3 text-center font-semibold text-secondary hover:bg-desert"
          >
            Hubungi Tim Reservasi
          </Link>
          <a
            href="https://wa.me/6281234567890"
            className="rounded-full border border-white/70 px-6 py-3 text-center font-semibold text-white hover:bg-white/10"
          >
            Konsultasi via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
