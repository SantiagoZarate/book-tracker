import Link from 'next/link';
import { SignUpForm } from './SignUpForm';

export default function SignUpPage() {
  return (
    <section className="flex flex-col gap-4">
      <SignUpForm />
      <footer className="flex justify-center">
        <Link href="/signin">already have an account? Sign in here!</Link>
      </footer>
    </section>
  );
}
