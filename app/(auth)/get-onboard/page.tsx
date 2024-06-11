import React from 'react';
import AccProfile from '@/components/forms/AccProfile';
import { fetchUserInfo } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { object } from 'zod';

const getOnboardPage = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUserInfo(user.id);
  if (userInfo?.isOnboard) {
    redirect('/');
  }
  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || '',
    userImage: userInfo ? userInfo?.userImage : user.imageUrl,
    phoneNumber: userInfo?.phoneNumber,
  };
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20 bg-secondary">
      <h1 className="text-4xl font-semibold">
        On<span className="text-red-600">Boarding </span>
      </h1>
      <p className="mt-3 text-lg">Get onboard to our platform</p>

      <section className="mt-9 p-10">
        <AccProfile user={userData} />
      </section>
    </main>
  );
};

export default getOnboardPage;
