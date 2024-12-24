'use client';

import { opacity } from '@/app/lib/motion-animations';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AddMicroIcon } from '../icons/AddMicroIcon';
import { MotionLoaderButton } from '../motion/MotionLoaderButton';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';

const sessionContentSchema = z.object({
  content: z.string(),
});

type SessionContentSchema = z.infer<typeof sessionContentSchema>;

interface Props {
  defaultContent?: string;
  onSaveContent: (content: string) => void;
}

export function SessionContentForm({
  onSaveContent,
  defaultContent = '',
}: Props) {
  const form = useForm<SessionContentSchema>({
    resolver: zodResolver(sessionContentSchema),
    defaultValues: {
      content: defaultContent,
    },
  });

  return (
    <motion.form
      className="m-1 flex flex-col items-end gap-2 rounded-[inherit] bg-input p-1"
      // onSubmit={form.handleSubmit(({ content }) => onSaveContent(content))}
      {...opacity}
      action={() => onSaveContent(form.getValues('content'))}
    >
      <Form {...form}>
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full flex-1">
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input
                  className="border-dashed bg-background text-xs"
                  placeholder="Chapter 12 was fire"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <MotionLoaderButton
          icon={<AddMicroIcon />}
          className="w-fit"
          isPending={false}
        >
          save
        </MotionLoaderButton>
      </Form>
    </motion.form>
  );
}
