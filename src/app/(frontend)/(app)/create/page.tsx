// When creating a new book track there are gonna be 2
// ways of creating it, selecting an already existent book
// or adding a new one.

import { AddMicroIcon } from '@/app/components/icons/AddMicroIcon';
import { Section, SectionHeader } from '@/app/components/ui/section';
import { CreateForm } from './CreateForm';

export default function page() {
  return (
    <Section>
      <SectionHeader
        title="Add book"
        description="Create a new book track"
        icon={<AddMicroIcon />}
      />
      <CreateForm />
    </Section>
  );
}
