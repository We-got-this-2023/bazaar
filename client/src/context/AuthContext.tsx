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
  isLoading: boolean;
  error: string;
}

const prompt = (username: string) => console.log(`Welcome back, ${username}!`);

const AuthContext = createContext({}) as AuthContextI;

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<any>(null),
    [userLoggedIn, setUserLoggedIn] = useState<boolean>(false),
    [isLoading, setIsLoading] = useState<boolean>(true),
    [error, setError] = useState<string | undefined>(),
    clearUser = (error?: string) => {
      setIsLoading(false);
      localStorage.removeItem("token");
      setUser(undefined);
      if (error) setError(error);
      setUserLoggedIn(false);
    },
    addUser = ({ user, token }: { user: any; token: string }) => {
      setIsLoading(false);
      localStorage.setItem("token", JSON.stringify(token));
      setUser(user);
      setUserLoggedIn(true);
      setError(undefined);
    };

  useEffect(() => {
    const tokenUser = attemptTokenLogin();
    if (tokenUser) {
      setUser(tokenUser);
      setUserLoggedIn(true);
      setError(undefined);
      setIsLoading(false);
    } else clearUser();
  }, []);

  useEffect(() => prompt(user?.name), [user]);

  const login = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    const data = {
      email: values.email.toLowerCase().trim(),
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
    setIsLoading(false);
  };

  const signup = async (values: {
    email: string;
    username: string;
    password: string;
  }) => {
    setIsLoading(true);
    const data = {
      email: values.email.toLowerCase().trim(),
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
    setIsLoading(false);
  };

  const value = {
    userLoggedIn,
    login,
    signup,
    user,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext) as AuthContextI;
}
