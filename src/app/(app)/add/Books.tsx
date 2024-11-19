"use client";

import { Button } from "@/app/components/ui/button";
import { BookGenresDTO } from "@/shared/dtos/bookDTO";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { addBookAction } from "./action";

interface Props {
  books: BookGenresDTO[];
}

export function Books({ books }: Props) {
  const { execute, isPending } = useServerAction(addBookAction, {
    onSuccess: ({}) => {
      toast("Book added");
    },
  });

  return (
    <ul className="flex flex-col divide-y">
      {books.map((book) => (
        <li key={book.id} className="p-2">
          <section className="flex justify-between items-center w-full">
            <section className="flex flex-col">
              <p>{book.title}</p>
              <ul className="flex gap-2">
                {book.genres.map((genre) => (
                  <li
                    className="text-xs rounded-xl bg-card border border-border px-2 py-1"
                    key={genre.name}
                  >
                    <p>{genre.name}</p>
                  </li>
                ))}
              </ul>
            </section>
            <Button
              disabled={isPending}
              onClick={() => execute({ bookId: book.id })}
              className="transition"
            >
              Add
            </Button>
          </section>
        </li>
      ))}
    </ul>
  );
}
