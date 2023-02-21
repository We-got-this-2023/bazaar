import { Context, createContext, useContext, useState } from "react";

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

const AuthContext = createContext({}) as AuthContextI;

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState();

  const login = async (values: { email: string; password: string }) => {
    const loggedInResponse = await fetch("http://localhost:5173/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (loggedInResponse.ok) {
      setUser(await loggedInResponse.json());
      console.log(user);
    } else {
      setUser(undefined);
      console.log();
      throw new Error("Invalid credentials");
    }
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
      setUser(await loggedInResponse.json());
      console.log(user);
    } else {
      setUser(undefined);
      console.log(loggedInResponse);
      throw new Error("Error registering user. Please try again later.");
    }
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
