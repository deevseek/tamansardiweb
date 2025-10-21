import Image from 'next/image';

const features = [
  {
    title: 'Outbond Team Building',
    description:
      'Arena high rope, flying fox, paintball, dan fun games yang dirancang oleh fasilitator bersertifikat untuk memperkuat kolaborasi tim.',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    href: '/outbond'
  },
  {
    title: 'Villa Panorama Muria',
    description:
      'Deretan villa kayu dan glamping dome dengan pemandangan sunrise Gunung Muria, lengkap dengan api unggun dan paket barbeque.',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    href: '/villa'
  },
  {
    title: 'Hall Serbaguna Sardi Pavilion',
    description:
      'Ruang semi-outdoor berkapasitas 500 orang dengan tata suara profesional, cocok untuk resepsi, rapat, dan peluncuran produk.',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
    href: '/hall'
  }
];

export function FeatureHighlights() {
  return (
    <section id="paket" className="container-responsive py-20 space-y-12">
      <div className="text-center space-y-3">
        <h2 className="section-title">Pengalaman Unggulan Taman Sardi</h2>
        <p className="section-subtitle">
          Setiap sudut dirancang menyatu dengan alam. Nikmati udara sejuk Colo, aliran sungai Lereng Muria, dan
          pelayanan hangat khas masyarakat Kudus.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="group rounded-3xl bg-white shadow-lg overflow-hidden border border-secondary/10"
          >
            <div className="relative h-56">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-semibold text-secondary">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              <a
                href={feature.href}
                className="inline-flex items-center text-primary font-semibold hover:underline"
              >
                Pelajari lebih lanjut →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
