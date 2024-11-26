import { booksService } from '@/services/book/book.service';
import { CreateForm } from './CreateForm';

export default async function CreateBookPage() {
  const genres = await booksService.getGenres();

  return <CreateForm genres={genres} />;
}
