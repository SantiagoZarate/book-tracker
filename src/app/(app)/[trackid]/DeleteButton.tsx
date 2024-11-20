'use client';

import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { useTracker } from '../../hooks/useTracker';
import { deleteTrackAction } from './actions';

export function DeleteButton() {
  const { track } = useTracker();
  const { execute } = useServerAction(deleteTrackAction, {
    onSuccess() {
      toast('Book track deleted');
    },
  });

  return (
    <Dialog>
      <DialogTrigger className="flex w-full items-center rounded-sm p-1 text-sm transition hover:bg-secondary">
        Delete track
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete book track</DialogTitle>
          <DialogDescription>
            Are you sure you wanna delete your progress? once deleted it cannot
            be back
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => execute({ trackId: track.id })}
            variant={'destructive'}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
