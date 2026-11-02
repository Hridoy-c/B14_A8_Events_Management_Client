import { authClient } from "./auth-client";

export const getTokenFromClient = async () => {
  const { data, error } = await authClient.token();

  if (error) {
    console.error("Failed to get auth token:", error);
    return null;
  }

  return data?.token ?? null;
};
