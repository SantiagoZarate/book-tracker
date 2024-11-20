import { BookGenresDTO } from "@/shared/dtos/bookDTO";

interface Props {
  genres: BookGenresDTO["genres"];
}

export function GenreList({ genres }: Props) {
  return (
    <ul className="flex gap-2">
      {genres.map((genre) => (
        <li
          className="text-xs rounded-xl bg-card border border-border px-2 py-1"
          key={genre.name}
        >
          <p>{genre.name}</p>
        </li>
      ))}
    </ul>
  );
}
