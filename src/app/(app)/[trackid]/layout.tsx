import { trackService } from '@/services/track/track.service';
import { PropsWithChildren } from 'react';
import { TrackProvider } from '../../provider/trackProvider';

interface Props extends PropsWithChildren {
  params: {
    trackid: string;
  };
}

export default async function TrackLayout({
  children,
  params: { trackid },
}: Props) {
  const track = await trackService.getOne({
    id: trackid,
  });
  return <TrackProvider track={track}>{children}</TrackProvider>;
}
