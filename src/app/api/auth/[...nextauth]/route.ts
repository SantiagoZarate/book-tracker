import envs from '@/config/envs';
import { userService } from '@/services/user/user.service';
import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  pages: {
    newUser: '/',
    signIn: '/signin',
  },
  callbacks: {
    async signIn({ user, credentials }) {
      if (credentials) {
        console.log('RUNNING THE SIGNIN CALLBACK WITH CREDENTIALS');
        return true;
      }

      const userExistsInDb = await userService.userExists(user!.email!);

      if (!userExistsInDb) {
        // Create user
        await userService.register({
          email: user!.email!,
          password: 'SIGNED IN WITH PROVIDER',
          username: user!.name!,
        });
      }
      return true;
    },
  },
  providers: [
    GithubProvider({
      clientId: envs.auth.github.id,
      clientSecret: envs.auth.github.secret,
    }),
    CredentialsProvider({
      // Name and credentials are used by the built in next auth page
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'John' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '******',
        },
      },
      async authorize(credentials) {
        const user = await userService.login({
          password: credentials!.password,
          username: credentials!.username,
        });

        if (user) {
          return { ...user, name: user.username };
        } else {
          return null;
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
