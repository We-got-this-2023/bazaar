import { Context, createContext, useContext, useEffect, useState } from "react";
import attemptTokenLogin from "../utils/attemptTokenLogin";
import parseJWT from "../utils/parseJWT";

interface AuthContextI extends Context<{}> {
  userLoggedIn: boolean;
  login: (values: { email: string; password: string }) => Promise<void>;
  signup: (values: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  user: any;
}

const prompt = (username: string) => console.log(`Welcome back, ${username}!`);

const AuthContext = createContext({}) as AuthContextI;

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser]: [any, any] = useState(null),
    clearUser = (error?: string) => {
      localStorage.removeItem("token");
      setUser(undefined);
      if (error) throw new Error(error);
    },
    addUser = ({ user, token }: { user: any; token: string }) => {
      localStorage.setItem("token", JSON.stringify(token));
      setUser(user);
    };

  useEffect(() => {
    const user = attemptTokenLogin();
    if (user) setUser(user);
    else clearUser();
  }, []);

  useEffect(() => prompt(user?.name), [user]);

  const login = async (values: { email: string; password: string }) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    const loggedInResponse = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (loggedInResponse.ok) {
      const { token } = await loggedInResponse.json();
      const user = parseJWT(token);
      if (!user) clearUser();
      else addUser({ user, token });
    } else clearUser("Invalid credentials");
  };

  const signup = async (values: {
    email: string;
    username: string;
    password: string;
  }) => {
    const data = {
      email: values.email,
      name: values.username,
      password: values.password,
    };
    const loggedInResponse = await fetch(
      "http://localhost:3000/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    if (loggedInResponse.ok) {
      const { token } = await loggedInResponse.json();
      const user = parseJWT(token);
      if (!user) clearUser();
      else addUser({ user, token });
    } else clearUser("Error registering user. Please try again later.");
  };

  const value = {
    userLoggedIn: false,
    login,
    signup,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext) as AuthContextI;
}
