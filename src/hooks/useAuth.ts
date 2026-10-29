
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Account } from "../types";

const STORAGE_KEY = "nexus_logged_in_account_id";

export function useAuth(accounts: Account[] = []) {
  const [accountId, setAccountId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEY);
  });

  const account = useMemo(
    () => accounts.find((item) => item.id === accountId) ?? null,
    [accounts, accountId]
  );

  useEffect(() => {
    if (!accountId || accounts.length === 0) return;

    const exists = accounts.some((item) => item.id === accountId);

    if (!exists) {
      localStorage.removeItem(STORAGE_KEY);
      setAccountId(null);
    }
  }, [accountId, accounts]);

  const login = useCallback((user: Account) => {
    localStorage.setItem(STORAGE_KEY, user.id);
    setAccountId(user.id);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAccountId(null);
  }, []);

  return {
    account,
    accountId,
    isAuthenticated: account !== null,
    login,
    logout,
  };
}
