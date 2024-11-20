"use client";

import { useTracker } from "../hooks/useTracker";

export function Sessions() {
  const { track } = useTracker();
  const { sessions } = track;

  if (sessions.length === 0) {
    return (
      <section className="flex p-8 w-full bg-secondary rounded-lg items-center justify-center">
        There are no sessions for this track
      </section>
    );
  }

  sessions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <ul>
      {sessions.map((session) => (
        <li key={session.id}>
          <p>{session.pagesRead}</p>
        </li>
      ))}
    </ul>
  );
}
