'use client';

import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { useTracker } from '../../hooks/useTracker';
import { toggleCompleteAction } from './actions';

export function CompleteTrackButton() {
  const { track, addSession } = useTracker();
  const { execute } = useServerAction(toggleCompleteAction, {
    onSuccess() {
      toast('Book track completed state changed');
    },
  });

  const handleToggleComplete = () => {
    addSession({
      ...track,
      isCompleted: !track.isCompleted,
    });
    execute({ trackId: track.id });
  };

  return (
    <form action={handleToggleComplete}>
      <button>toggle complete state</button>
    </form>
  );
}
