import prisma from "@/db";
import { Keypair } from "@solana/web3.js";
import { Session } from "next-auth";
import { generateFromEmail } from "unique-username-generator";
import GoogleProvider from "next-auth/providers/google";

export interface session extends Session {
  user: {
    uid: string;
    email: string;
    name: string;
    username: string;
    image: string;
  };
}

export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    session: ({ session, token }: any): session => {
      const newSession: session = session as session;
      if (newSession.user && token.uid) {
        newSession.user.uid = token.uid ?? "";
      }
      return newSession!;
    },
    async jwt({ token, account, profile }: any) {
      const user = await prisma.user.findFirst({
        where: {
          sub: account?.providerAccountId ?? "",
        },
      });
      if (user) {
        token.uid = user.id;
      }

      return token;
    },

   
    async signIn({ user, account, profile, email, credentials }: any) {
      if (account?.provider == "google") {
        const email = user.email;
        if (!email) {
          return false;
        }

        const existingUser = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (existingUser) {
          return true;
        }

        const username = generateFromEmail(email, 3);
        const keyPair = Keypair.generate();
        const publicKey = keyPair.publicKey.toBase58();
        const privateKey = keyPair.secretKey.toString();

        await prisma.user.create({
          data: {
            email,
            username,
            name: profile?.name,
            sub: account.providerAccountId,
            //@ts-ignore
            profilePicture: profile?.picture,
            solWallet: {
              create: {
                privateKey,
                publicKey,
              },
            },
            inrWallet: {
              create: { balance: 0 },
            },
          },
        });

        return true;
      }

      return false;
    },
  },
};
