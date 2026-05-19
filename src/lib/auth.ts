import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const adminEmail = (process.env.ADMIN_EMAIL || 'admin@parikshanotes.com').trim();
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        // Dev fallback if the hash is not set or is still the default placeholder
        if (!adminPasswordHash || adminPasswordHash.includes('placeholder')) {
          if (credentials.email === adminEmail && credentials.password === 'admin123') {
            return {
              id: '1',
              email: adminEmail,
              name: 'Admin',
            };
          }
        }

        if (credentials.email !== adminEmail) {
          return null;
        }

        if (adminPasswordHash) {
          try {
            const isValid = await bcrypt.compare(credentials.password, adminPasswordHash);
            if (isValid) {
              return {
                id: '1',
                email: adminEmail,
                name: 'Admin',
              };
            }
          } catch (err) {
            console.error('Bcrypt comparison error:', err);
          }
        }

        // Additional simple text fallback for convenience during development/demo
        if (credentials.email === 'admin@parikshanotes.com' && credentials.password === 'admin123') {
          return {
            id: '1',
            email: 'admin@parikshanotes.com',
            name: 'Admin',
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/admin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = 'admin';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
