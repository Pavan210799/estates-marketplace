import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { readStorage, writeStorage } from "../lib/utils";

const AuthContext = createContext(null);
const ACCOUNTS_KEY = "estates.accounts";
const SESSION_KEY = "estates.session";
const LEGACY_USER_KEY = "estates.user";

function loadAccounts() {
  const accounts = readStorage(ACCOUNTS_KEY, []);
  const legacy = readStorage(LEGACY_USER_KEY, null);
  const merged = [...accounts];
  if (legacy?.email && !merged.some((item) => item.email === legacy.email)) merged.push(legacy);
  if (legacy) {
    writeStorage(ACCOUNTS_KEY, merged);
    localStorage.removeItem(LEGACY_USER_KEY);
  }
  return merged;
}

function sameEmail(a, b) {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStorage(SESSION_KEY, null));
  const [splashUser, setSplashUser] = useState(null);

  const startSession = useCallback((account) => {
    const session = { name: account.name, email: account.email };
    writeStorage(SESSION_KEY, session);
    setUser(session);
    setSplashUser(session);
  }, []);

  const login = useCallback(
    ({ email, password }) => {
      const account = loadAccounts().find((item) => sameEmail(item.email, email));
      if (!account || account.password !== password) {
        return { ok: false, error: "Email or password is incorrect. New here? Create an account." };
      }
      startSession(account);
      return { ok: true };
    },
    [startSession],
  );

  const register = useCallback(
    ({ name, email, password }) => {
      const accounts = loadAccounts();
      if (accounts.some((item) => sameEmail(item.email, email))) {
        return { ok: false, error: "An account with this email already exists. Sign in instead." };
      }
      const account = { name: name.trim(), email: email.trim(), password };
      writeStorage(ACCOUNTS_KEY, [...accounts, account]);
      startSession(account);
      return { ok: true };
    },
    [startSession],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
      isAuthenticated: Boolean(user),
      splashUser,
      dismissSplash: () => setSplashUser(null),
    }),
    [user, login, register, logout, splashUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
