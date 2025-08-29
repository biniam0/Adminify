import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { ac, ADMIN, GUEST, STAFF } from "./permissions";

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  plugins: [
    adminClient({
      ac,
      roles: {
        ADMIN,
        STAFF,
        GUEST,
      },
    }),
  ],
  fetchOptions: {
    credentials: "include",
  },
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
  forgetPassword,
  resetPassword,
  revokeSession,
} = authClient;

export type Session = typeof authClient.$Infer.Session;
