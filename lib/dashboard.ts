import { prisma } from './prisma';

export async function getSummary() {
  const [packages, testimonials, pendingEvents, confirmedEvents] = await Promise.all([
    prisma.package.count(),
    prisma.testimonial.count(),
    prisma.eventRequest.count({ where: { status: 'PENDING' } }),
    prisma.eventRequest.count({ where: { status: 'CONFIRMED' } })
  ]);

  return {
    packages,
    testimonials,
    pendingEvents,
    confirmedEvents
  };
}
