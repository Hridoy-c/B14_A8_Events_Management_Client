import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins"

// Same-origin by default. Set NEXT_PUBLIC_BETTER_AUTH_URL only if the auth
// server lives on a different origin than this app.
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [
    jwtClient() 
  ]
});
