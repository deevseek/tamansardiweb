import { TestimonialsTable } from '@/components/tables/TestimonialsTable';
import { TestimonialForm } from '@/components/forms/TestimonialForm';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-display text-secondary">Kelola Testimoni</h1>
        <p className="text-sm text-gray-600">Tambah cerita pengunjung dan atur testimoni yang tampil pada halaman utama.</p>
      </header>
      <TestimonialForm />
      <TestimonialsTable testimonials={testimonials} />
    </div>
  );
}
