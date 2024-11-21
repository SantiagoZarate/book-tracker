import envs from '@/config/envs';
import NextAuth from 'next-auth';

import GithubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: envs.auth.github.id,
      clientSecret: envs.auth.github.secret,
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
  ],
});

export { handler as GET, handler as POST };
