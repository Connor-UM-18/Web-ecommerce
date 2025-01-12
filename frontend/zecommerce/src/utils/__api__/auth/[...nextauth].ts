// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@utils/__api__/users";
export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g., 'Sign in with...')
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Add your own logic here to find the user in your database
        const user = await api.getUser(credentials.email, credentials.password);

        if (user) {
          // Any object returned will be saved in `user` property of the session
          return Promise.resolve(user);
        } else {
          // If you return null or false, then the credentials will be rejected
          return Promise.resolve(null);
        }
      }
    })
  ],
  pages: {
    signIn: '/login',  // Custom login page
    signOut: '/logout', // Custom logout page
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      // Add token logic
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      // Add session logic
      session.user.id = token.id;
      return session;
    }
  }
});
