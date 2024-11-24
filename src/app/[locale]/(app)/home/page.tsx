import { QueueListMicroIcon } from '@/app/components/icons/QueueListMicroIcon';
import { MotionList } from '@/app/components/motion/MotionList';
import { MotionListItem } from '@/app/components/motion/MotionListItem';
import { SectionHeader } from '@/app/components/ui/section';
import { trackService } from '@/services/track/track.service';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { BookTrackItem } from './BookTrackItem';

export default async function page() {
  const tracks = await trackService.getAllByUser();
  const t = await getTranslations();

  return (
    <section className="flex flex-col gap-2">
      <SectionHeader
        description={t('home.description')}
        icon={<QueueListMicroIcon />}
        title={t('home.title')}
        className="p-2"
      />
      <section>
        {tracks.length === 0 ? (
          <Link href={'/add'} className="group">
            <section className="m-2 flex items-center justify-center rounded-sm bg-secondary py-24 transition group-hover:-translate-y-1">
              <p>{t('home.no-tracks')}</p>
            </section>
          </Link>
        ) : (
          <MotionList className="flex flex-col divide-y">
            {tracks.map((track) => (
              <MotionListItem key={track.id} className="p-1">
                <BookTrackItem track={track} />
              </MotionListItem>
            ))}
          </MotionList>
        )}
      </section>
    </section>
  );
}
