import { AddMicroIcon } from '@/app/components/icons/AddMicroIcon';
import { Section, SectionHeader } from '@/app/components/ui/section';
import { PropsWithChildren } from 'react';
import { CreateForm } from './CreateForm';
import { StepHeader } from './StepHeader';

export default function CreateLayout({ children }: PropsWithChildren) {
  return (
    <Section className="gap-8">
      <SectionHeader
        title="Add book"
        description="Create a new book track"
        icon={<AddMicroIcon />}
      />
      <StepHeader />
      <CreateForm>{children}</CreateForm>
    </Section>
  );
}
