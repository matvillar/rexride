'use client';

import { useRouter } from 'next/navigation';
import { use, useEffect } from 'react';
import ChatsPage from './[chatId]/page';

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    router.push('/messages');
  }, [error, router]);

  return <ChatsPage />;
}
