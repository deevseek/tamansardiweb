'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import clsx from 'classnames';

const links = [
  { href: '/', label: 'Beranda' },
  { href: '/outbond', label: 'Outbond' },
  { href: '/villa', label: 'Villa' },
  { href: '/hall', label: 'Hall' },
  { href: '/gallery', label: 'Galeri' },
  { href: '/contact', label: 'Kontak' },
  { href: '/admin', label: 'Admin' }
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur shadow-sm">
      <div className="container-responsive flex items-center justify-between py-4">
        <Link href="/" className="font-display text-2xl text-secondary">Taman Sardi</Link>
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden rounded-md border border-secondary/20 px-3 py-2 text-secondary"
        >
          ☰
        </button>
        <nav
          className={clsx(
            'flex flex-col md:flex-row gap-4 md:gap-6 md:items-center text-sm font-medium text-secondary/80',
            open ? 'absolute top-full left-0 right-0 bg-white shadow-md p-6 md:relative md:p-0' : 'hidden md:flex'
          )}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={clsx(
                'transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary font-semibold' : ''
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
