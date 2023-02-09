import { Context, createContext, useContext } from "react";

interface AuthContextI extends Context<{}> {
  userLoggedIn: boolean;
  login: (values: { email: string; password: string }) => Promise<void>;
  user: {
    id: string;
  };
}

const AuthContext = createContext({}) as AuthContextI;

export function AuthProvider({ children }: { children: JSX.Element }) {
  const login = async (values: { email: string; password: string }) => {
    const loggedInResponse = await fetch("http://localhost:3000/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    console.log(loggedInResponse);
  };

  const value = {
    userLoggedIn: false,
    login,
    user: {
      id: "123",
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext) as AuthContextI;
}
