import { TrackBookPagesDTO } from '@/shared/dtos/trackDTO';

export const books: TrackBookPagesDTO[] = [
  {
    id: '1a2b3c4d',
    isCompleted: false,
    startedAt: '2024-09-01T10:30:00Z',
    book: {
      title: 'The Great Gatsby',
      id: 'book-123',
      totalPages: 180,
      author: 'F. Scott Fitzgerald',
    },
    pagesAlreadyRead: 45,
  },
  {
    id: '5e6f7g8h',
    isCompleted: false,
    startedAt: '2024-08-20T14:15:00Z',
    book: {
      title: '1984',
      id: 'book-456',
      totalPages: 328,
      author: 'George Orwell',
    },
    pagesAlreadyRead: 150,
  },
  {
    id: '9i0j1k2l',
    isCompleted: false,
    startedAt: '2024-07-15T08:00:00Z',
    book: {
      title: 'To Kill a Mockingbird',
      id: 'book-789',
      totalPages: 281,
      author: 'Harper Lee',
    },
    pagesAlreadyRead: 222,
  },
];
