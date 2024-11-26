'use client';

import { FileUploader } from '@/app/components/ui/file-uploader';
import { UploadedFilesCard } from '@/app/components/ui/file-uploader/uploaded-file-card';
import { useUploadFile } from '@/app/hooks/use-upload-file';

export default function StepTwoPage() {
  const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile(
    'imageUploader',
    {
      defaultUploadedFiles: [],
    },
  );

  return (
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
  );
}
