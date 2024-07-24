'use client';
import { Input } from '@/components/ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useSearchParams, useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
const SearchRide = ({
  placeholder = 'Search City of Departure',
}: {
  placeholder?: string;
}) => {
  const [query, setQuery] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = '';
      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query'],
        });
      }
      router.push(newUrl, { scroll: false });
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);
  return (
    <div className="flex mx-auto items-center min-h-[50px] w-[95%] overflow-hidden rounded-full bg-gray-50 px-4 py-2">
      <FaSearch size={24} />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="p-4 border-0 text-lg bg-gray-50 outline-offset-0 placeholder-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default SearchRide;
