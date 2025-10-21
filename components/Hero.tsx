import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-primary to-accent text-white">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef"
          alt="Hutan pinus di lereng gunung"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>
      <div className="relative container-responsive py-28 flex flex-col gap-10 md:flex-row md:items-center">
        <div className="md:w-1/2 space-y-6">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm uppercase tracking-wide">
            Wisata Alam Gunung Muria
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Taman Sardi, Pelarian Teduh di Kaki Gunung Muria
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-xl">
            Temukan ketenangan di tengah pepohonan pinus, sawah bertingkat, dan udara sejuk khas Colo Kudus.
            Kami menghadirkan paket outbond, villa privat, hingga hall serbaguna untuk berbagai kebutuhan
            gathering dan perayaan Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-white text-secondary px-6 py-3 text-center font-semibold shadow-lg hover:bg-desert hover:text-secondary"
            >
              Rencanakan Kunjungan
            </Link>
            <Link
              href="#paket"
              className="rounded-full border border-white/80 px-6 py-3 text-center font-semibold hover:bg-white/10"
            >
              Lihat Paket Unggulan
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 grid grid-cols-2 gap-4 text-sm">
          {[
            {
              title: 'Outbond Adventure',
              desc: 'Rintangan dan permainan tim di kawasan hutan pinus dan persawahan.'
            },
            { title: 'Villa Panorama', desc: 'Pilihan villa kayu dan glamping dengan sunrise Gunung Muria.' },
            {
              title: 'Hall Serbaguna',
              desc: 'Ruang semi-outdoor untuk rapat, resepsi, hingga peluncuran produk.'
            },
            {
              title: 'Kuliner Lokal',
              desc: 'Nikmati kopi Muria, wedang rempah, dan prasmanan tradisional Kudus.'
            }
          ].map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-white/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
