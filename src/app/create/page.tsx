// When creating a new book track there are gonna be 2
// ways of creating it, selecting an already existent book
// or adding a new one.

import { createBookTrack } from "./action";

export default function page() {
  return (
    <section className="flex flex-col gap-8">
      <header>
        <p className="text-xl">Create a new book track</p>
      </header>
      <form action={createBookTrack}>
        <input name="title" type="text" placeholder="the martian" />
        <button>Create</button>
      </form>
    </section>
  );
}
