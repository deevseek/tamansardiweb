'use client';

import { Package, PackageCategory } from '@prisma/client';
import useSWR from 'swr';

interface PackageWithStringId extends Package {}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const categoryLabel: Record<PackageCategory, string> = {
  OUTBOND: 'Outbond',
  VILLA: 'Villa',
  HALL: 'Hall'
};

export function PackagesTable({ packages: initial }: { packages: PackageWithStringId[] }) {
  const { data, mutate } = useSWR<PackageWithStringId[]>('/api/packages', fetcher, {
    fallbackData: initial
  });

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus paket ini?')) return;
    await fetch(`/api/packages/${id}`, { method: 'DELETE' });
    mutate();
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-secondary/20 text-secondary/70">
            <th className="py-3 pr-4">Nama Paket</th>
            <th className="py-3 pr-4">Kategori</th>
            <th className="py-3 pr-4">Harga Mulai</th>
            <th className="py-3 pr-4">Kapasitas</th>
            <th className="py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((pkg) => (
            <tr key={pkg.id} className="border-b border-secondary/10">
              <td className="py-3 pr-4 font-medium text-secondary">{pkg.title}</td>
              <td className="py-3 pr-4 text-secondary/80">{categoryLabel[pkg.category]}</td>
              <td className="py-3 pr-4 text-secondary/80">Rp {pkg.price.toLocaleString('id-ID')}</td>
              <td className="py-3 pr-4 text-secondary/80">{pkg.capacity ?? '–'}</td>
              <td className="py-3">
                <button
                  type="button"
                  onClick={() => handleDelete(pkg.id)}
                  className="rounded-full bg-red-500 px-4 py-1 text-xs font-semibold text-white hover:bg-red-600"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
