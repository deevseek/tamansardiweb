'use client';

import { FormEvent } from 'react';
import useSWRMutation from 'swr/mutation';

async function createTestimonial(url: string, { arg }: { arg: Record<string, unknown> }) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(arg)
  });
  if (!res.ok) {
    throw new Error('Gagal menyimpan testimoni');
  }
  return res.json();
}

export function TestimonialForm() {
  const { trigger, isMutating, error } = useSWRMutation('/api/testimonials', createTestimonial);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    await trigger({
      name: data.name as string,
      company: data.company as string,
      message: data.message as string,
      rating: Number(data.rating ?? 5)
    });
    event.currentTarget.reset();
    window.location.reload();
  };

  return (
    <section className="rounded-3xl border border-secondary/10 bg-desert/40 p-6">
      <h2 className="text-xl font-semibold text-secondary">Tambah Testimoni</h2>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col text-sm font-medium text-secondary/90">
          Nama
          <input
            name="name"
            required
            className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-secondary/90">
          Instansi / Komunitas
          <input
            name="company"
            required
            className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-secondary/90 md:col-span-2">
          Pesan
          <textarea
            name="message"
            rows={3}
            required
            className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-secondary/90">
          Rating
          <input
            name="rating"
            type="number"
            min="1"
            max="5"
            defaultValue={5}
            className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </label>
        <div className="md:col-span-2 flex flex-col gap-2">
          <button
            type="submit"
            disabled={isMutating}
            className="self-start rounded-full bg-primary px-6 py-2 text-white font-semibold hover:bg-secondary disabled:opacity-70"
          >
            {isMutating ? 'Menyimpan...' : 'Simpan Testimoni'}
          </button>
          {error && <p className="text-sm text-red-600">{error.message}</p>}
        </div>
      </form>
    </section>
  );
}
