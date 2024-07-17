'use client';

import { useRouter } from 'next/navigation';
import { use, useEffect } from 'react';

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [error, router]);

  return;
}
