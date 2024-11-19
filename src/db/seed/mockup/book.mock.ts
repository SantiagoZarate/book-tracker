import { BookInsert } from "@/types/book.type";
import { MockGenre } from "./genre.mock";

type MockBook = BookInsert & {
  genres: MockGenre[];
};

export const MOCK_BOOKS: MockBook[] = [
  {
    title: "The Mystic Forest",
    author: "Ella Woods",
    genres: ["Fantasy", "Adventure"],
    totalPages: 350,
  },
  {
    title: "Beyond the Stars",
    author: "Lucas Orion",
    genres: ["Science Fiction", "Thriller"],
    totalPages: 412,
  },
  {
    title: "Secrets in the Shadows",
    author: "Mia Black",
    genres: ["Mystery", "Crime"],
    totalPages: 280,
  },
  {
    title: "Love in the Moonlight",
    author: "Sophia Hart",
    genres: ["Romance", "Drama"],
    totalPages: 320,
  },
  {
    title: "Haunted Memories",
    author: "Victor Graves",
    genres: ["Horror", "Paranormal"],
    totalPages: 250,
  },
  {
    title: "Echoes of the Past",
    author: "Hannah Stone",
    genres: ["Historical Fiction", "Classic"],
    totalPages: 390,
  },
  {
    title: "The Art of Mindfulness",
    author: "Liam Carter",
    genres: ["Self-Help", "Spirituality"],
    totalPages: 200,
  },
  {
    title: "Adventures in the Wild",
    author: "Ethan Hunt",
    genres: ["Adventure", "Non-Fiction"],
    totalPages: 340,
  },
  {
    title: "The Quantum Code",
    author: "Nora Flynn",
    genres: ["Science Fiction", "Technology"],
    totalPages: 430,
  },
  {
    title: "Laughter Therapy",
    author: "Emily Joy",
    genres: ["Humor", "Self-Help"],
    totalPages: 180,
  },
];
