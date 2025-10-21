import { PrismaClient, PackageCategory, EventStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.eventRequest.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.package.deleteMany();

  const packages = await prisma.package.createMany({
    data: [
      {
        title: 'Sardi Adventure Day',
        category: PackageCategory.OUTBOND,
        description:
          'Program outbond sehari penuh mencakup ice breaking, high rope challenge, flying fox, serta lunch prasmanan khas Kudus.',
        facilities: ['Instruktur Bersertifikat', 'Peralatan Safety', 'Sound System', 'Makan Siang Prasmanan'],
        duration: '1 hari',
        capacity: 150,
        price: 185000,
        imageUrl: 'https://images.unsplash.com/photo-1518607692857-bff9babd9e28'
      },
      {
        title: 'Panorama Villa Retreat',
        category: PackageCategory.VILLA,
        description:
          'Menginap dua malam di villa kayu panorama dengan sunrise Gunung Muria, termasuk api unggun dan sarapan tradisional.',
        facilities: ['Villa AC', 'Breakfast Lokal', 'Api Unggun', 'Pemandu Trekking'],
        duration: '2 malam',
        capacity: 20,
        price: 3500000,
        imageUrl: 'https://images.unsplash.com/photo-1496412705862-e0088f16f791'
      },
      {
        title: 'Sardi Pavilion Gala',
        category: PackageCategory.HALL,
        description:
          'Sewa hall semi-outdoor berkapasitas 500 pax untuk rapat, resepsi, maupun peluncuran produk lengkap dengan tata suara.',
        facilities: ['Kursi dan Meja', 'Dekorasi Dasar', 'Sound System', 'Ruang Rias'],
        duration: '8 jam',
        capacity: 500,
        price: 7500000,
        imageUrl: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef'
      }
    ]
  });

  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Budi Santoso',
        company: 'PT Sukses Bersama',
        message:
          'Fasilitator outbond sangat komunikatif dan profesional. Pemandangan pinus dan udara sejuk membuat tim kami betah.',
        rating: 5
      },
      {
        name: 'Maria Fransiska',
        company: 'Komunitas Fotografi Muria',
        message:
          'Villa panorama dengan cahaya pagi yang indah, cocok sekali untuk hunting foto sunrise dan milky way.',
        rating: 5
      },
      {
        name: 'Yusuf Maulana',
        company: 'Event Organizer Kudus',
        message:
          'Hall serbaguna luas dan fleksibel. Kru Taman Sardi membantu dari dekorasi hingga konsumsi.',
        rating: 4
      }
    ]
  });

  const [firstPackage] = await prisma.package.findMany({ take: 1 });

  if (firstPackage) {
    await prisma.eventRequest.create({
      data: {
        name: 'Eka Wulandari',
        email: 'eka@creativehub.id',
        phone: '6281234567890',
        date: new Date(),
        message: 'Kami ingin mengadakan gathering keluarga besar dengan konsep tradisional.',
        status: EventStatus.PENDING,
        packageId: firstPackage.id
      }
    });
  }

  console.log('Database seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
