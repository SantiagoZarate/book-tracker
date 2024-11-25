import { type ClientUploadedFileData } from 'uploadthing/types';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {}
