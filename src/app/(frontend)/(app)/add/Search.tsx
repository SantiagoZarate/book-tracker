'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useId } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import './search.css';

export function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const path = usePathname();
  const inputId = useId();

  const handleOnChange = useDebouncedCallback((value: string) => {
    const url = new URLSearchParams(searchParams);
    if (value) {
      url.set('search', value.trim());
    } else {
      url.delete('search');
    }
    replace(`${path}?${url.toString()}`);
  }, 1000);

  return (
    <section className="search sticky top-0 z-50 flex flex-col gap-1 bg-background p-2">
      <label htmlFor={inputId} className="text-xs font-semibold">
        Book title
      </label>
      <input
        defaultValue={searchParams.get('search')?.toString() ?? ''}
        className="text-ms rounded-sm border bg-card px-2 py-1"
        onChange={(e) => handleOnChange(e.target.value)}
        placeholder="The lord of the ring"
        id={inputId}
        type="text"
      />
    </section>
  );
}
