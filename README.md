# Taman Sardi Web

A promotional website for Taman Sardi tourism destination in Kudus, featuring outbond adventures, panoramic villas, and a multi-purpose hall. The project is built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Prisma** with a MySQL database. It includes a public marketing site and a lightweight admin panel for managing packages, testimonials, and event requests.

## Fitur Utama

### Website Publik
- Landing page dengan highlight pengalaman wisata Taman Sardi.
- Halaman khusus untuk paket Outbond, Villa & Glamping, serta Hall Serbaguna.
- Galeri foto atmosfer alam Gunung Muria.
- Form permintaan proposal event dengan integrasi database.

### Panel Admin
- Login sederhana berbasis kredensial `.env`.
- Dashboard ringkas untuk melihat statistik paket, testimoni, dan event.
- CRUD paket wisata, testimoni pengunjung, serta update status permintaan event.

## Persyaratan
- Node.js 18+
- MySQL 8.x (atau kompatibel)

## Konfigurasi Lingkungan

1. Duplikat file `.env.example` menjadi `.env` dan sesuaikan nilai berikut:
   ```env
   DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/tamansardi"
   ADMIN_EMAIL="admin@tamansardi.id"
   ADMIN_PASSWORD="supersecret"
   ```
2. Pastikan database `tamansardi` sudah tersedia atau gunakan nama lain sesuai konfigurasi Anda.

## Instalasi

```bash
npm install
```

## Migrasi & Seed Database

Generate Prisma Client, jalankan migrasi, lalu seed data contoh:

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

Seed akan menambahkan paket wisata, testimoni, dan contoh permintaan event.

## Menjalankan Aplikasi

```bash
npm run dev
```

Akses website di `http://localhost:3000`.

## Panel Admin

1. Buka `http://localhost:3000/admin/login`.
2. Masuk menggunakan `ADMIN_EMAIL` dan `ADMIN_PASSWORD` yang ada di `.env`.
3. Setelah login, Anda dapat mengelola konten paket, testimoni, dan permintaan event.

> **Catatan:** Panel admin menggunakan penyimpanan lokal di browser sebagai sesi sederhana untuk tujuan demo. Implementasi produksi perlu sistem autentikasi yang lebih kuat.

## Struktur Proyek Singkat

```
app/
  ├─ page.tsx                 # Landing page utama
  ├─ outbond/                 # Halaman paket outbond
  ├─ villa/                   # Halaman villa & glamping
  ├─ hall/                    # Halaman hall serbaguna
  ├─ gallery/                 # Galeri foto
  ├─ contact/                 # Form permintaan proposal
  └─ admin/                   # Panel admin (login + area terlindungi)
components/
  ├─ forms/                   # Form admin (paket, testimoni)
  ├─ tables/                  # Tabel data admin
  └─ dashboard/               # Komponen ringkasan dashboard
lib/
  ├─ prisma.ts                # Prisma client singleton
  └─ dashboard.ts             # Helper pengambilan ringkasan data
prisma/
  ├─ schema.prisma            # Skema database
  └─ seed.ts                  # Seeder data contoh
```

## Pengembangan Lanjutan
- Integrasi autentikasi berbasis session/token (mis. NextAuth, Lucia, dsb.).
- Fitur upload gambar ke storage (S3, Cloudinary).
- Sistem notifikasi email untuk permintaan event baru.

## Lisensi
Proyek ini untuk keperluan demo dan dapat dikembangkan lebih lanjut sesuai kebutuhan.
