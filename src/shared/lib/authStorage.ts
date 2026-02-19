const AUTH_TOKEN_KEY = "authToken";

export type AuthStorageScope = "persistent" | "session";

export const getStoredToken = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    localStorage.getItem(AUTH_TOKEN_KEY) ??
    sessionStorage.getItem(AUTH_TOKEN_KEY)
  );
};

export const saveToken = (token: string, scope: AuthStorageScope): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_TOKEN_KEY);

  const storage = scope === "persistent" ? localStorage : sessionStorage;

  storage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearToken = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
};
