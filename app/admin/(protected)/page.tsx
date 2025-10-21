import { Suspense } from 'react';
import { getSummary } from '@/lib/dashboard';
import { SummaryCards } from '@/components/dashboard/SummaryCards';

export const dynamic = 'force-dynamic';

async function SummarySection() {
  const summary = await getSummary();
  return <SummaryCards summary={summary} />;
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-display text-secondary">Dashboard</h1>
        <p className="text-sm text-gray-600">
          Pantau paket aktif, testimoni terbaru, dan permintaan event dari pengunjung Taman Sardi.
        </p>
      </div>
      <Suspense fallback={<p>Memuat ringkasan...</p>}>
        <SummarySection />
      </Suspense>
    </div>
  );
}
