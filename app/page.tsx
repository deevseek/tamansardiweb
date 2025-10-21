import { CallToAction } from '@/components/CallToAction';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { FeatureHighlights } from '@/components/FeatureHighlights';
import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { prisma } from '@/lib/prisma';

export const revalidate = 60;

export default async function HomePage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' }, take: 6 });

  return (
    <div className="space-y-0">
      <Hero />
      <StatsBar />
      <FeatureHighlights />
      <ExperienceTimeline />
      <TestimonialCarousel initial={testimonials} />
      <CallToAction />
    </div>
  );
}
