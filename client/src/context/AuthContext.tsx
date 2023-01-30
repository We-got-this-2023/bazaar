import { Context, createContext, useContext } from "react";

interface AuthContextI extends Context<{}> {
  userLoggedIn: boolean;
  user: {
    id: string;
  };
}

const AuthContext = createContext({}) as AuthContextI;

export function AuthProvider({ children }: { children: JSX.Element }) {
  // Logic for user authentication

  const value = {
    userLoggedIn: false,
    user: {
      id: "123",
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext) as AuthContextI;
}
