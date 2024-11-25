'use client';

import { AddMicroIcon } from '@/app/components/icons/AddMicroIcon';
import { BackArrowMicroIcon } from '@/app/components/icons/BackArrowMicroIcon';
import { MotionLoaderButton } from '@/app/components/motion/MotionLoaderButton';
import { IconButton } from '@/app/components/ui/button';
import { FileUploader } from '@/app/components/ui/file-uploader';
import { UploadedFilesCard } from '@/app/components/ui/file-uploader/uploaded-file-card';
import { Form } from '@/app/components/ui/form';
import { Option } from '@/app/components/ui/multiple-selector';
import { useUploadFile } from '@/app/hooks/use-upload-file';
import { GenreDTO } from '@/shared/dtos/bookDTO';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { createBookAction } from './action';
import { CreateBookSchema, createBookSchema } from './bookSchema';
import { StepOne } from './StepOne';

interface Props {
  genres: GenreDTO[];
}

export function CreateForm({ genres }: Props) {
  const [step, setSetp] = useState(1);
  const multipleSelectorOptions: Option[] = genres.map((g) => ({
    label: g.name,
    value: g.name,
  }));

  const form = useForm<CreateBookSchema>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      pages: 1,
      author: '',
      title: '',
      genres: [],
      cover: undefined,
    },
  });

  const { execute, isPending } = useServerAction(createBookAction, {
    onSuccess() {
      toast('Book succesfully added');
      form.reset();
    },
    onError({ err }) {
      toast(err.message);
      form.setError('title', { message: err.message });
    },
  });

  const handleSubmit = async (payload: CreateBookSchema) => {
    execute(payload);
  };

  const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile(
    'imageUploader',
    {
      defaultUploadedFiles: [],
    },
  );

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="grid grid-cols-2 gap-4"
    >
      <Form {...form}>
        {step === 1 && <StepOne genresOptions={multipleSelectorOptions} />}
        {step === 2 && (
          <div className="col-span-2 flex flex-col gap-6">
            <FileUploader
              maxFileCount={4}
              maxSize={4 * 1024 * 1024}
              progresses={progresses}
              onUpload={onUpload}
              disabled={isUploading}
            />
            <UploadedFilesCard uploadedFiles={uploadedFiles} />
          </div>
        )}
        {step === 3 && (
          <>
            <p>DETAILS</p>
          </>
        )}
        <footer className="col-span-2 flex gap-2 *:flex-1">
          <IconButton
            onClick={() => setSetp(step - 1)}
            icon={<BackArrowMicroIcon />}
            disabled={step === 1}
            type="button"
          >
            back
          </IconButton>
          {step !== 3 ? (
            <IconButton
              onClick={() => setSetp(step + 1)}
              icon={<AddMicroIcon />}
              type="button"
            >
              Next
            </IconButton>
          ) : (
            <MotionLoaderButton icon={<AddMicroIcon />} isPending={isPending}>
              create
            </MotionLoaderButton>
          )}
        </footer>
      </Form>
    </form>
  );
}
