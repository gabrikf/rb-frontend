// import React, { createContext, useContext, useEffect, useState } from "react";
// import { api } from "../services/api";

// type User = {
//   id: string;
//   avatar_url: string;
//   name: string;
//   login: string;
// };

// type AuthContextData = {
//   user: User | null;
//   isSignIn: boolean;
//   signIn: () => Promise<void>;
//   signOut: () => Promise<void>;
// };

// type AuthProviderProps = {
//   children: React.ReactNode;
// };

// type AuthResponse = {
//   token: string;
//   user: User;
// };

// type AuthorizationResponse = {
//   params: {
//     code?: string;
//     error?: string;
//   };
//   type?: string;
// };

// export const AuthContext = createContext({} as AuthContextData);

// function AuthProvider({ children }: AuthProviderProps) {
//   const [isSignIn, setIsSignIn] = useState(true);
//   const [user, setUser] = useState<User | null>(null);

//   async function signIn() {
//     try {
//       setIsSignIn(true);
//       const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;

//       const authSessionResponse = (await AuthSession.startAsync({
//         authUrl,
//       })) as AuthorizationResponse;
//       console.log(authSessionResponse.params);
//       if (
//         authSessionResponse.type === "success" &&
//         authSessionResponse.params.error !== "access_denied"
//       ) {
//         const authResponse = await api.post("authenticate", {
//           code: authSessionResponse.params.code,
//         });
//         const { user, token } = authResponse.data as AuthResponse;
//         api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//         await AsyncStorege.setItem(USER_STOREGE, JSON.stringify(user));
//         await AsyncStorege.setItem(TOKEN_STOREGE, token);
//         setUser(user);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsSignIn(false);
//     }
//   }
//   async function signOut() {
//     setUser(null);
//     await AsyncStorege.removeItem(USER_STOREGE);
//     await AsyncStorege.removeItem(TOKEN_STOREGE);
//   }

//   useEffect(() => {
//     async function loadStoregeData() {
//       const userStorege = await AsyncStorege.getItem(USER_STOREGE);
//       const tokenStorege = await AsyncStorege.getItem(TOKEN_STOREGE);

//       if (userStorege && tokenStorege) {
//         api.defaults.headers.common["Authorization"] = `Bearer ${tokenStorege}`;
//         setUser(JSON.parse(userStorege));
//       }
//       setIsSignIn(false);
//     }
//     loadStoregeData();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         signIn,
//         signOut,
//         user,
//         isSignIn,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// function useAuth() {
//   const context = useContext(AuthContext);
//   return context;
// }

// export { useAuth, AuthProvider };

export function AuthContextHook () {
    return <h1>opa</h1>
}