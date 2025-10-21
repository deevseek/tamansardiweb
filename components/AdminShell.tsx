'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'classnames';

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/packages', label: 'Paket Wisata' },
  { href: '/admin/testimonials', label: 'Testimoni' },
  { href: '/admin/events', label: 'Permintaan Event' }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('tamansardi_admin');
    if (!token) {
      router.replace('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white">
      <div className="container-responsive py-10">
        <div className="grid gap-8 lg:grid-cols-[240px,1fr]">
          <aside className="rounded-2xl border border-secondary/10 bg-desert/40 p-6">
            <h2 className="text-lg font-semibold text-secondary mb-6">Panel Admin</h2>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'block rounded-xl px-4 py-2 text-sm font-medium hover:bg-white hover:text-secondary',
                    pathname === item.href ? 'bg-white text-secondary shadow' : 'text-secondary/70'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('tamansardi_admin');
                router.replace('/admin/login');
              }}
              className="mt-6 w-full rounded-full border border-secondary/20 px-4 py-2 text-sm font-semibold text-secondary hover:bg-white"
            >
              Keluar
            </button>
          </aside>
          <section className="rounded-3xl border border-secondary/10 bg-white p-6 shadow-sm">{children}</section>
        </div>
      </div>
    </div>
  );
}
