import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { recoverUserInformation, signInRequest } from "../services/auth";
import { api } from "../services/api";

interface SignInData {
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
  avatarUrl: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<{ message: string }>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInData) {
    try {
      const { token, user } = await signInRequest({
        email,
        password,
      });

      // runing on web, so first params is undefined
      setCookie(undefined, "auth_next-token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      setUser(user);
      if (user?.isAdmin) {
        Router.push("/");
        alert(`Bem vindo de volta, ${user?.name}!`);
        return { message: "Logged!" };
      } else {
        Router.push("/");
        alert(`Bem vindo de volta, ${user?.name}!`);
        return { message: "Logged!" };
      }
    } catch (error) {
      return { message: `Error: ${error}` };
    }
  }

  async function signOut() {
    const { "auth_next-token": token } = parseCookies();

    if (token) {
      try {
        destroyCookie(undefined, "auth_next-token");
        Router.push("/");
        Router.reload();
      } catch (error) {
        Router.push("/");
        Router.reload();
        console.log("Error signOut: ", error);
      }
    }
  }

  useEffect(() => {
    const { "auth_next-token": token } = parseCookies();

    if (token) {
      recoverUserInformation(token)
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => console.log(`RecoverUserInfo Error: ${err}`));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
