// When creating a new book track there are gonna be 2
// ways of creating it, selecting an already existent book
// or adding a new one.

import { CreateForm } from "./CreateForm";

export default function page() {
  return (
    <section className="flex flex-col gap-8">
      <header>
        <p className="text-xl">Create a new book track</p>
      </header>
      <CreateForm />
    </section>
  );
}
