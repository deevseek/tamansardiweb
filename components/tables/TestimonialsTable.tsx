'use client';

import { Testimonial } from '@prisma/client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function TestimonialsTable({ testimonials: initial }: { testimonials: Testimonial[] }) {
  const { data, mutate } = useSWR<Testimonial[]>('/api/testimonials', fetcher, {
    fallbackData: initial
  });

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus testimoni ini?')) return;
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    mutate();
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-secondary/20 text-secondary/70">
            <th className="py-3 pr-4">Nama</th>
            <th className="py-3 pr-4">Instansi</th>
            <th className="py-3 pr-4">Pesan</th>
            <th className="py-3 pr-4">Rating</th>
            <th className="py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((testimonial) => (
            <tr key={testimonial.id} className="border-b border-secondary/10">
              <td className="py-3 pr-4 font-medium text-secondary">{testimonial.name}</td>
              <td className="py-3 pr-4 text-secondary/80">{testimonial.company}</td>
              <td className="py-3 pr-4 text-secondary/80 max-w-md">{testimonial.message}</td>
              <td className="py-3 pr-4 text-secondary/80">{testimonial.rating}</td>
              <td className="py-3">
                <button
                  type="button"
                  onClick={() => handleDelete(testimonial.id)}
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
