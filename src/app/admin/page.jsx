'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {

  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {

    if (status === 'unauthenticated') {
      router.push('/login');
    }

  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen p-10">

      <h1 className="text-4xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <p className="text-lg">
        Welcome, {session.user?.name}
      </p>

    </div>
  );
}