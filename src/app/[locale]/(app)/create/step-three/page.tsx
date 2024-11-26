'use client';

import { useFormContext } from 'react-hook-form';
import { CreateBookSchema } from '../bookSchema';

export default function StepTherePage() {
  const { getValues } = useFormContext<CreateBookSchema>();

  return (
    <>
      <section className="col-span-2 grid grid-cols-3 gap-4 [&_p:first-child]:text-sm [&_p:first-child]:text-black/40">
        <section>
          <p>Title</p>
          <p>{getValues('title')}</p>
        </section>
        <section>
          <p>Author</p>
          <p>{getValues('author')}</p>
        </section>
        <section>
          <p>Pages</p>
          <p>{getValues('pages')}</p>
        </section>
        <section>
          <p>genres</p>
          <ul className="flex gap-2">
            {getValues('genres').map((g) => (
              <li key={g.value}>{g.value}</li>
            ))}
          </ul>
        </section>
      </section>
    </>
  );
}
