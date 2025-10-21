'use client';

import useSWR from 'swr';
import { useMemo, useState } from 'react';
import clsx from 'classnames';

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  message: string;
  rating: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function TestimonialCarousel({ initial }: { initial?: Testimonial[] }) {
  const { data } = useSWR<Testimonial[]>('/api/testimonials', fetcher, {
    dedupingInterval: 60000,
    fallbackData: initial
  });
  const testimonials = useMemo(() => data ?? [], [data]);
  const [index, setIndex] = useState(0);

  if (!testimonials.length) {
    return null;
  }

  const active = testimonials[index % testimonials.length];

  return (
    <section className="bg-white py-20">
      <div className="container-responsive grid gap-8 md:grid-cols-[2fr,1fr] md:items-center">
        <div>
          <p className="uppercase text-sm text-primary font-semibold">Cerita Tamu</p>
          <h2 className="text-3xl font-display text-secondary mb-6">Kenangan Mereka di Taman Sardi</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            “{active.message}”
          </p>
          <div className="mt-6">
            <p className="font-semibold text-secondary">{active.name}</p>
            <p className="text-sm text-gray-500">{active.company}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex gap-3">
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.id}
                type="button"
                aria-label={`Tampilkan testimoni ${testimonial.name}`}
                onClick={() => setIndex(i)}
                className={clsx(
                  'h-3 w-3 rounded-full transition-colors',
                  i === index ? 'bg-primary' : 'bg-gray-200 hover:bg-gray-300'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
