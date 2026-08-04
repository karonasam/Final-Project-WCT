import { createContext, useContext } from "react";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

import { auth } from "../firebase/firebase.jsx";


const AuthContext = createContext();

export function AuthProvider({ children }) {

  async function register({ email, password, name }) {

    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = result.user;

    await updateProfile(user, {
      displayName: name
    });

    return user;
  }
  async function login({ email, password }) {

    const result = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    console.log("UID:", result.user.uid);

    return result.user;
  }
  return (
    <AuthContext.Provider value={{ register, login }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}