import { create } from "zustand";
import { persist } from "zustand/middleware";

function readAccounts() {
  try {
    return JSON.parse(localStorage.getItem("mesob-accounts") || "[]");
  } catch {
    return [];
  }
}

function writeAccounts(accounts) {
  localStorage.setItem("mesob-accounts", JSON.stringify(accounts));
}

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,

      register: ({ name, email, phone, password }) => {
        const accounts = readAccounts();
        const exists = accounts.some(
          (a) => a.email === email.toLowerCase() || a.phone === phone,
        );
        if (exists) return { ok: false, error: "Account already exists." };

        const account = {
          id: "acc-" + Date.now(),
          name,
          email: email.toLowerCase(),
          phone,
          password,
        };
        writeAccounts([...accounts, account]);

        const session = { ...account };
        delete session.password;
        set({ user: session });
        return { ok: true };
      },

      signIn: ({ email, password }) => {
        const accounts = readAccounts();
        const account = accounts.find((a) => a.email === email.toLowerCase());
        if (!account)
          return { ok: false, error: "No account found. Please register." };
        if (account.password !== password)
          return { ok: false, error: "Incorrect password." };

        const session = { ...account };
        delete session.password;
        set({ user: session });
        return { ok: true };
      },

      signOut: () => set({ user: null }),
    }),
    { name: "mesob-user" },
  ),
);
