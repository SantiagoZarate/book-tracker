import { QueueListMicroIcon } from '@/app/components/icons/QueueListMicroIcon';
import { MotionList } from '@/app/components/motion/MotionList';
import { MotionListItem } from '@/app/components/motion/MotionListItem';
import { EmptyTracks } from '@/app/components/track/EmptyTracks';
import { Section, SectionHeader } from '@/app/components/ui/section';
import { trackService } from '@/services/track/track.service';
import { getTranslations } from 'next-intl/server';
import { BookTrackItem } from './BookTrackItem';

export default async function page() {
  const tracks = await trackService.getAllByUser();
  const t = await getTranslations();

  return (
    <Section className="p-0">
      <SectionHeader
        description={t('home.description')}
        icon={<QueueListMicroIcon />}
        title={t('home.title')}
        className="p-2"
      />
      {tracks.length ? (
        <MotionList className="flex flex-col divide-y">
          {tracks.map((track) => (
            <MotionListItem key={track.id} className="p-1">
              <BookTrackItem track={track} />
            </MotionListItem>
          ))}
        </MotionList>
      ) : (
        <EmptyTracks />
      )}
    </Section>
  );
}
