import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByUsername } from "@/lib/db";
import { getAuthSecret } from "@/lib/auth-secret";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Tên đăng nhập", type: "text" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const user = await getUserByUsername(credentials.username);

        if (!user || user.password !== credentials.password) return null;

        return {
          id: user.id,
          name: user.fullName,
          email: user.email,
          studentId: user.studentId,
          fullName: user.fullName,
          major: user.major,
          majorCode: user.majorCode,
          cohort: user.cohort,
          curriculumId: user.curriculumId,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.studentId = user.studentId;
        token.fullName = user.fullName;
        token.major = user.major;
        token.majorCode = user.majorCode;
        token.cohort = user.cohort;
        token.curriculumId = user.curriculumId;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.studentId = token.studentId;
      session.user.fullName = token.fullName;
      session.user.major = token.major;
      session.user.majorCode = token.majorCode;
      session.user.cohort = token.cohort;
      session.user.curriculumId = token.curriculumId;
      session.user.role = token.role;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: getAuthSecret(),
};
