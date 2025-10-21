'use client';

import { FormEvent, useState } from 'react';
import useSWRMutation from 'swr/mutation';

async function createPackage(url: string, { arg }: { arg: Record<string, unknown> }) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(arg)
  });
  if (!res.ok) {
    throw new Error('Gagal menyimpan paket');
  }
  return res.json();
}

const categories = [
  { value: 'OUTBOND', label: 'Outbond' },
  { value: 'VILLA', label: 'Villa' },
  { value: 'HALL', label: 'Hall' }
];

export function PackageForm() {
  const [facilities, setFacilities] = useState<string>('');
  const { trigger, isMutating, error } = useSWRMutation('/api/packages', createPackage);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    await trigger({
      title: data.title as string,
      category: data.category as string,
      description: data.description as string,
      facilities: facilities
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      duration: data.duration ? String(data.duration) : null,
      capacity: data.capacity ? Number(data.capacity) : null,
      price: Number(data.price),
      imageUrl: data.imageUrl ? String(data.imageUrl) : null
    });
    event.currentTarget.reset();
    setFacilities('');
    window.location.reload();
  };

  return (
    <section className="rounded-3xl border border-secondary/10 bg-desert/40 p-6">
      <h2 className="text-xl font-semibold text-secondary">Tambah Paket Baru</h2>
      <p className="text-sm text-gray-600 mb-4">Lengkapi informasi paket untuk muncul pada halaman promosi.</p>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col text-sm font-medium text-secondary/90">
          Nama Paket
          <input
            name="title"
            required
            className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-secondary/90">
          Kategori
          <select
            name="category"
            required
            className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-sm font-medium text-secondary/90 md:col-span-2">
          Deskripsi Singkat
          <textarea
            name="description"
            required
            rows={3}
            className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-secondary/90">
          Fasilitas (pisahkan dengan koma)
          <input
            value={facilities}
            onChange={(event) => setFacilities(event.target.value)}
            className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
            placeholder="Instruktur, Makan Siang, Sound System"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-secondary/90">
          Durasi
          <input
            name="duration"
            className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
            placeholder="1 hari"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-secondary/90">
          Kapasitas
          <input
            name="capacity"
            type="number"
            className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
            placeholder="150"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-secondary/90">
          Harga (Rp)
          <input
            name="price"
            type="number"
            min="0"
            required
            className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-secondary/90">
          URL Gambar
          <input
            name="imageUrl"
            type="url"
            className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
            placeholder="https://"
          />
        </label>
        <div className="md:col-span-2 flex flex-col gap-2">
          <button
            type="submit"
            disabled={isMutating}
            className="self-start rounded-full bg-primary px-6 py-2 text-white font-semibold hover:bg-secondary disabled:opacity-70"
          >
            {isMutating ? 'Menyimpan...' : 'Simpan Paket'}
          </button>
          {error && <p className="text-sm text-red-600">{error.message}</p>}
        </div>
      </form>
    </section>
  );
}
