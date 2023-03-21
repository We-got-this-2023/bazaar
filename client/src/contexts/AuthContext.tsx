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
    localStorage.removeItem("token");
    setUser(undefined);
    setError(error || undefined);
    setUserLoggedIn(false);
  };

  const addUser = ({ user, token }: { user: any; token: string }) => {
    setIsLoading(false);
    localStorage.setItem("token", JSON.stringify(token));
    setUser(user);
    setUserLoggedIn(true);
    setError(undefined);
  };

  const fetchWrapper = async ({
    url,
    method,
    data,
    errors,
  }: {
    url: string;
    method?: string;
    data: object;
    errors?: {
      [key: number]: string;
    };
  }) => {
    try {
      setIsLoading(true);
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const { token } = await res.json();
        const user = parseJWT(token);
        if (!user) clearUser();
        else addUser({ user, token });
      } else {
        clearUser();
        setError(
          errors
            ? errors[res.status]
            : "Something went wrong with the request. Please try again later."
        );
      }
    } catch (err: any) {
      clearUser(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Check JWT token for expiry on load
  useEffect(() => {
    const tokenUser = attemptTokenLogin();
    if (tokenUser) {
      setUser(tokenUser);
      setUserLoggedIn(true);
      setError(undefined);
      setIsLoading(false);
    } else clearUser("Invalid token");
  }, []);

  const login = async (data: { email: string; password: string }) => {
    data.email = data.email.toLowerCase().trim();
    console.log(data);
    fetchWrapper({
      url: `${import.meta.env.VITE_API}/auth/login`,
      method: "POST",
      data,
      errors: {
        401: "Email or password is incorrect.",
        404: "Email or password is incorrect.",
      },
    });
  };

  const signup = async (data: {
    email: string;
    username: string;
    password: string;
  }) => {
    data.email = data.email.toLowerCase().trim();

    fetchWrapper({
      url: `${import.meta.env.VITE_API}/register`,
      method: "POST",
      data,
      errors: {
        409: "Email already in use.",
        500: "Something went wrong while registering. Please try again later.",
      },
    });
  };

  async function setUserInformation(data: { name: string; email: string }) {
    await fetchWrapper({
      method: "PATCH",
      url: `${import.meta.env.VITE_API}/users/${user.id}`,
      data,
      errors: {
        401: "Invalid token.",
        500: "Something went wrong while updating your profile. Please try again later.",
      },
    });
  }

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
