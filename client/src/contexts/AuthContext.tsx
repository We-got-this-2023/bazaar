import { Context, createContext, useContext, useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

interface AuthContextI extends Context<{}> {
  userLoggedIn: boolean;
  login: (values: { email: string; password: string }) => Promise<void>;
  signup: (values: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  user: User;
  isLoading: boolean;
  error: string;
  setUserInformation: (user: any) => Promise<void>;
}

export interface User {
  id: number;
  name: string;
  email: string;
  ratings: [];
  createdAt: string;
  updatedAt: string;
}

const AuthContext = createContext({}) as AuthContextI;

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | undefined>();
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();

  // Helper functions
  const clearUser = (error?: string) => {
    setIsLoading(false);
    setUser(undefined);
    setError(error || undefined);
    setUserLoggedIn(false);
  };

  const addUser = ({ user }: { user: User }) => {
    setIsLoading(true);
    setUser(user);
    setUserLoggedIn(false);
    setError(undefined);
  };

  const fetchWrapper = async (
    url: string,
    {
      method,
      data,
      errors,
      options,
      headers,
      credentials,
    }: {
      method?: string;
      data?: object;
      headers?: { [key: string]: string };
      errors?: {
        [key: number]: string;
      };
      options?: any;
      credentials?: string;
    }
  ) => {
    try {
      setIsLoading(true);
      const res = await fetch(import.meta.env.VITE_API + url, {
        method,
        headers: headers ?? { "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : undefined,
        credentials: credentials ?? undefined,
        ...options,
      });

      if (res.ok) {
        return await res.json();
      } else {
        setError(
          errors
            ? errors[res.status]
            : "Something went wrong with the request. Please try again later."
        );
        console.log(error);
      }
    } catch (err: any) {
      console.log(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: {
    email: string;
    name: string;
    password: string;
  }) => {
    data.email = data.email.toLowerCase().trim();

    const val = await fetchWrapper(`http://localhost:3000/auth/signup`, {
      method: "POST",
      data,
    });
    console.log(val);
    return val;
  };

  async function setUserInformation(data: { name: string; email: string }) {
    data.email = data.email.toLowerCase().trim();
    const val = await fetchWrapper(`/users/${user?.id}`, {
      method: "PATCH",
      data,
      headers: {
        Authorization:
          "Bearer " +
          document.cookie
            .split(";")
            .filter((val) => val.startsWith("token="))[0]
            .split("=")[1],
        "Content-Type": "application/json",
      },
      errors: {
        401: "Invalid token.",
        500: "Something went wrong while updating your profile. Please try again later.",
      },
    });
    console.log("User");
    console.log(val);
    // setUser(val);
  }

  async function login(data: { email: string; password: string }) {
    data.email = data.email.toLowerCase().trim();
    const res = await fetchWrapper(`/auth/signin`, {
      method: "POST",
      data,
      credentials: "include",
    });
    navigate("/");
  }

  // Function to get the current user from the server
  async function getUser(id: number) {
    const res = await fetchWrapper(`/users/me/${id}`, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          document.cookie
            .split(";")
            .filter((val) => val.startsWith("token="))[0]
            .split("=")[1],
        "Content-Type": "application/json",
      },
    });
    return res.user;
  }

  useEffect(() => {
    (async () => {
      try {
        // Parse the token from the cookies
        const token = document.cookie
          .split("; ")
          .filter((cookie) => cookie.startsWith("token="))[0]
          .split("=")[1];
        const parsedToken = token
          ? JSON.parse(atob(token.split(".")[1]))
          : null;
        setUser(await getUser(parsedToken.id));
      } catch (err: any) {
        setUser(undefined);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  let value = {
    user,
    userLoggedIn,
    login,
    signup,
    clearUser,
    addUser,
    setUserInformation,
    getUser,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext) as AuthContextI;
}
