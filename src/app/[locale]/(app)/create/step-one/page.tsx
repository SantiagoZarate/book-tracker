import { booksService } from '@/services/book/book.service';
import { StepOne } from './StepOne';

export default async function CreateBookPage() {
  const genres = await booksService.getGenres();

  return <StepOne genres={genres} />;
}
