'use client';

import { useState } from 'react';

const initialState = {
  name: '',
  email: '',
  phone: '',
  date: '',
  packageId: '',
  message: ''
};

export function BookingForm({ packages }: { packages: { id: number; title: string }[] }) {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      if (!response.ok) {
        throw new Error('Failed');
      }
      setStatus('success');
      setForm(initialState);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col text-sm font-medium text-secondary/90">
          Nama Lengkap
          <input
            required
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
            placeholder="Nama Anda"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-secondary/90">
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
            placeholder="email@perusahaan.com"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-secondary/90">
          No. Telepon / WhatsApp
          <input
            required
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
            placeholder="0812xxxx"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-secondary/90">
          Tanggal Kedatangan
          <input
            type="date"
            required
            value={form.date}
            onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
            className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </label>
      </div>
      <label className="flex flex-col text-sm font-medium text-secondary/90">
        Paket yang Diminati
        <select
          required
          value={form.packageId}
          onChange={(event) => setForm((prev) => ({ ...prev, packageId: event.target.value }))}
          className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
        >
          <option value="">Pilih Paket</option>
          {packages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.title}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col text-sm font-medium text-secondary/90">
        Pesan Tambahan
        <textarea
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
          rows={4}
          placeholder="Tuliskan kebutuhan acara Anda"
        />
      </label>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-secondary disabled:opacity-70"
      >
        {status === 'loading' ? 'Mengirim...' : 'Kirim Permintaan Proposal'}
      </button>
      {status === 'success' && <p className="text-sm text-green-700">Terima kasih! Tim kami akan segera menghubungi.</p>}
      {status === 'error' && <p className="text-sm text-red-600">Terjadi kesalahan. Silakan coba lagi.</p>}
    </form>
  );
}
