import { createContext, useContext, useEffect, useState } from "react";
import {
  clearLocalSession,
  getLocalSession,
  loginLocalUser,
  registerLocalUser,
} from "../lib/localAuth.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getLocalSession());

  useEffect(() => {
    function syncSession(event) {
      if (event.key === "gatherly.demo.session") {
        setUser(getLocalSession());
      }
    }

    window.addEventListener("storage", syncSession);
    return () => window.removeEventListener("storage", syncSession);
  }, []);

  async function signup(details) {
    const nextUser = await registerLocalUser(details);
    setUser(nextUser);
    return nextUser;
  }

  async function login(credentials) {
    const nextUser = await loginLocalUser(credentials);
    setUser(nextUser);
    return nextUser;
  }

  function logout() {
    clearLocalSession();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return auth;
}
