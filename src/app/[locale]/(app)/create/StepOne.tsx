import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import MultipleSelector, {
  Option,
} from '@/app/components/ui/multiple-selector';
import { useFormContext } from 'react-hook-form';

interface Props {
  genresOptions: Option[];
}

export function StepOne({ genresOptions }: Props) {
  const form = useFormContext();

  return (
    <>
      <FormField
        name="title"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} placeholder="The Lord Of The Rings" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="author"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Author</FormLabel>
            <FormControl>
              <Input {...field} placeholder="J.R.R. Tolkien" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="pages"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of pages</FormLabel>
            <FormControl>
              <Input type="number" {...field} min={1} placeholder="232" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="genres"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Genres</FormLabel>
            <FormControl>
              <MultipleSelector
                {...field}
                defaultOptions={genresOptions}
                placeholder="What is the genre of this book?"
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
