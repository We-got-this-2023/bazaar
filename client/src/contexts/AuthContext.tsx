import { Context, createContext, useContext, useEffect, useState } from "react";

interface AuthContextI extends Context<{}> {
  userLoggedIn: boolean;
  login: (values: { email: string; password: string }) => Promise<void>;
  signup: (values: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  user: {
    id: string;
    username: string;
    email: string;
  };
  isLoading: boolean;
  error: string;
  setUserInformation: (user: any) => Promise<void>;
}

const AuthContext = createContext({}) as AuthContextI;

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<any>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();

  // Helper functions
  const clearUser = (error?: string) => {
    setIsLoading(false);
    setUser(undefined);
    setError(error || undefined);
    setUserLoggedIn(false);
  };

  const addUser = ({ user }: { user: any }) => {
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
      credentials,
    }: {
      method?: string;
      data?: object;
      errors?: {
        [key: number]: string;
      };
      options?: any;
      credentials?: string;
    }
  ) => {
    try {
      setIsLoading(true);
      console.log(import.meta.env.VITE_API + url);
      const res = await fetch(import.meta.env.VITE_API + url, {
        method,
        headers: { "Content-Type": "application/json" },
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
    username: string;
    password: string;
  }) => {
    data.email = data.email.toLowerCase().trim();

    const val = await fetchWrapper(`/auth/register`, {
      method: "POST",
      data,
      errors: {
        409: "Email already in use.",
        500: "Something went wrong while registering. Please try again later.",
      },
    });
  };

  async function setUserInformation(data: { name: string; email: string }) {
    const val = await fetchWrapper(`/users/${user.id}`, {
      method: "PATCH",
      data,
      errors: {
        401: "Invalid token.",
        500: "Something went wrong while updating your profile. Please try again later.",
      },
    });
    setUser(val);
  }

  async function login(data: { email: string; password: string }) {
    const res = await fetchWrapper(`/auth/signin`, {
      method: "POST",
      data,
      credentials: "include",
    });
    console.log(res);
  }

  // Function to get the current user from the server
  async function getCurrentUser() {
    const res = await fetchWrapper(`/currentUser`, {
      method: "GET",
      credentials: "include",
    });
    console.log(res);
    return res;
  }

  useEffect(() => {
    (async () => {
      try {
        setUser(await getCurrentUser());
      } catch (err: any) {
        setUser(null);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Auth context values
  const value = {
    userLoggedIn,
    login,
    signup,
    user,
    isLoading,
    error,
    setUserInformation,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext) as AuthContextI;
}
