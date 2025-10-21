import Image from 'next/image';

const galleryItems = [
  {
    src: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef',
    title: 'Jalur Pinus Menuju Area Outbond'
  },
  {
    src: 'https://images.unsplash.com/photo-1518607692857-bff9babd9e28',
    title: 'Keseruan High Rope Challenge'
  },
  {
    src: 'https://images.unsplash.com/photo-1496412705862-e0088f16f791',
    title: 'Villa Kayu Panorama dengan Kabut Pagi'
  },
  {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    title: 'Fun Games di Sawah Bertingkat'
  },
  {
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
    title: 'Hall Sardi Pavilion saat Gala Dinner'
  },
  {
    src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    title: 'Glamping Dome dengan Api Unggun Malam'
  }
];

export const metadata = {
  title: 'Galeri Taman Sardi'
};

export default function GalleryPage() {
  return (
    <div className="container-responsive py-16 space-y-8">
      <header className="space-y-3 text-center">
        <h1 className="text-4xl font-display text-secondary">Galeri Panorama Taman Sardi</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Intip suasana Taman Sardi dari lensa fotografer dan tamu. Perpaduan hutan pinus, kabut pegunungan, dan
          fasilitas modern siap menyambut Anda.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-3">
        {galleryItems.map((item) => (
          <figure key={item.src} className="group overflow-hidden rounded-3xl shadow-lg">
            <div className="relative h-64 w-full">
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <figcaption className="bg-white px-4 py-3 text-sm text-secondary/80">{item.title}</figcaption>
          </figure>
        ))}
      </section>
    </div>
  );
}
