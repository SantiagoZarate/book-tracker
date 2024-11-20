import { booksService } from '@/services/book/book.service';
import { Books } from './Books';

interface Props {
  query?: string | null;
}

export async function BooksList({ query }: Props) {
  const books = await booksService.getAll({ query });
  return <Books books={books} />;
}
