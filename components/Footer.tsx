import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container-responsive py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-display text-2xl mb-2">Taman Sardi</h3>
          <p className="text-sm text-white/80">
            Destinasi wisata alam di lereng Gunung Muria, Kudus. Nikmati pengalaman terpadu: outbond,
            villa private, dan hall serbaguna dengan lanskap hutan pinus dan persawahan.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-3">Kontak</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>Alamat: Desa Colo, Dawe, Kudus, Jawa Tengah</li>
            <li>Telepon: +62 812-3456-7890</li>
            <li>Email: halo@tamansardi.id</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-3">Navigasi Cepat</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link href="/outbond" className="hover:text-white">
                Paket Outbond
              </Link>
            </li>
            <li>
              <Link href="/villa" className="hover:text-white">
                Villa & Glamping
              </Link>
            </li>
            <li>
              <Link href="/hall" className="hover:text-white">
                Hall Serbaguna
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-white">
                Panel Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4">
        <p className="text-center text-xs text-white/70">
          © {new Date().getFullYear()} Taman Sardi. Dibangun dengan Next.js dan Prisma.
        </p>
      </div>
    </footer>
  );
}
