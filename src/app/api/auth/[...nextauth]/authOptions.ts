// import GoogleProvider from "next-auth/providers/google";
// import type { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   secret: process.env.NEXTAUTH_SECRET,

//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//           scope: [
//             "openid",
//             "email",
//             "profile",
//             "https://www.googleapis.com/auth/calendar",
//             "https://www.googleapis.com/auth/calendar.events",
//           ].join(" "),
//         },
//       },
//     }),
//   ],

//   pages: {
//     signIn: "/",
//     error: "/auth-error",
//   },

//   callbacks: {
//     async jwt({ token, account, profile }) {
//       if (account) {
//         token.accessToken = account.access_token;
//         token.refreshToken = account.refresh_token;
//         token.email = profile?.email ?? null;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       session.accessToken = token.accessToken;
//       session.refreshToken = token.refreshToken;
//       session.user = {
//         ...session.user,
//         email: token.email ?? null,
//       };
//       return session;
//     },
//   },
// };
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  
  // ✅ Combine both providers in ONE array
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Replace this with your DB logic
        const user = { id: "1", name: "Renuka", email: "renuka@example.com" };
        if (
          credentials?.email === "renuka@example.com" &&
          credentials?.password === "123456"
        ) {
          return user;
        }
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: [
            "openid",
            "email",
            "profile",
            "https://www.googleapis.com/auth/calendar",
            "https://www.googleapis.com/auth/calendar.events",
          ].join(" "),
        },
      },
    }),
  ],

  // ✅ Only define pages once
  pages: {
    signIn: "/",          // login page
    error: "/auth-error", // error page
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.email = profile?.email ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = {
        ...session.user,
        email: token.email ?? null,
      };
      return session;
    },
  },
};

