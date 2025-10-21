'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('tamansardi_admin')) {
      router.replace('/admin');
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    if (response.ok) {
      localStorage.setItem('tamansardi_admin', 'authorized');
      router.push('/admin');
    } else {
      const result = await response.json();
      setError(result.error ?? 'Login gagal.');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-desert/50 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-3xl bg-white p-8 shadow-xl border border-secondary/10"
      >
        <div>
          <h1 className="text-3xl font-display text-secondary">Masuk Panel Admin</h1>
          <p className="text-sm text-gray-600">Gunakan kredensial yang telah terdaftar.</p>
        </div>
        <label className="flex flex-col text-sm font-medium text-secondary/90">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
            placeholder="admin@tamansardi.id"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-secondary/90">
          Kata Sandi
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 rounded-xl border border-secondary/20 px-3 py-2 focus:border-primary focus:outline-none"
            placeholder="••••••"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-secondary"
        >
          Masuk
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}
