import envs from '@/config/envs';
import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  pages: {
    newUser: '/',
    signIn: '/signin',
  },
  providers: [
    GithubProvider({
      clientId: envs.auth.github.id,
      clientSecret: envs.auth.github.secret,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'John' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '******',
        },
      },
      authorize(credentials, req) {
        console.log({ credentials });
        console.log({ req });

        const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
  ],
});

export { handler as GET, handler as POST };
