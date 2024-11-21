import { BookGenresDTO } from '@/shared/dtos/bookDTO';

interface Props {
  genres: BookGenresDTO['genres'];
}

export function GenreList({ genres }: Props) {
  return (
    <ul className="flex gap-2">
      {genres.map((genre) => (
        <li
          className="rounded-xl border border-border bg-card px-2 py-1 text-xs"
          key={genre.name}
        >
          <p>{genre.name}</p>
        </li>
      ))}
    </ul>
  );
}
