import { Box } from "@mui/system";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { override } from "../utils/loadingCss";

type User = {
  id: string;
  email: string;
};

type AuthContextData = {
  user: User | null;
  isSignIn: boolean;
  handleSetLogin: (token: string) => void;
  handleLogout: () => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  function handleSetLogin(token: string) {
    try {
      setIsSignIn(true);
      let payload: any = token.split(".")[1];
      payload = atob(payload);
      payload = JSON.parse(payload);
      const id = payload.id;
      const email = payload.email;

      setUser({
        id,
        email,
      });
      localStorage.setItem("@token", token);
    } catch (e) {
      handleLogout();
    } finally {
      setIsSignIn(false);
    }
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("@token");
  }
  useEffect(() => {
    setIsSignIn(true);
    const storageToken = localStorage.getItem("@token");
    if (storageToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
      handleSetLogin(storageToken);
      setIsSignIn(false);
    }
  }, []);

  if (isSignIn) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <ClipLoader
          color={"#BBDEFB"}
          loading={isSignIn}
          css={override}
          size={150}
        />
      </Box>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isSignIn,
        handleSetLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { useAuth, AuthProvider };
