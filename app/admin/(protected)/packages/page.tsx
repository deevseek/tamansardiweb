import { PackageForm } from '@/components/forms/PackageForm';
import { PackagesTable } from '@/components/tables/PackagesTable';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminPackagesPage() {
  const packages = await prisma.package.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-display text-secondary">Kelola Paket Wisata</h1>
        <p className="text-sm text-gray-600">
          Tambah, ubah, atau hapus paket Outbond, Villa, dan Hall yang tampil di website promosi.
        </p>
      </header>
      <PackageForm />
      <PackagesTable packages={packages} />
    </div>
  );
}
