'use client';

import { trackContext } from '@/app/context/trackContext';
import { TrackBookSessionsDTO } from '@/shared/dtos/trackDTO';
import { PropsWithChildren, useOptimistic } from 'react';

interface Props extends PropsWithChildren {
  track: TrackBookSessionsDTO;
}

export function TrackProvider({ track, children }: Props) {
  const [optimisticTrack, addOptimisticTrack] = useOptimistic(
    track,
    (_state: TrackBookSessionsDTO, newState: TrackBookSessionsDTO) => {
      return newState;
    },
  );
  return (
    <trackContext.Provider
      value={{
        track: optimisticTrack,
        addSession: addOptimisticTrack,
      }}
    >
      {children}
    </trackContext.Provider>
  );
}
