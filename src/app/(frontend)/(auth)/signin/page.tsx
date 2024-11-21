import Link from 'next/link';
import { SignInForm } from './SignInForm';

export default function Page() {
  return (
    <section className="flex flex-col gap-4">
      <SignInForm />
      <footer className="flex justify-center">
        <Link href="/signup">You dont have an account? Sign up here!</Link>
      </footer>
    </section>
  );
}
