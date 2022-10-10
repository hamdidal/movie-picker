import {
  createUserWithEmailAndPassword,
  getAuth,
  NextOrObserver,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { app } from "../firebase";

export const login = async (email: string, password: string) => {
  const auth = getAuth(app);
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  const user = getAuth(app);
  return await signOut(user);
};

export const register = async (email: string, password: string) => {
  const auth = getAuth(app);
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const onAuthChange = (callback: NextOrObserver<User>) => {
  const auth = getAuth(app);
  onAuthStateChanged(auth, callback);
};
