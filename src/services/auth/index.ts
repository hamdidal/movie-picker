import {
  createUserWithEmailAndPassword,
  getAuth,
  NextOrObserver,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { app } from "../firebase";

export const setUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): User | undefined => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user) as User;
  else return undefined;
};

export const login = async (email: string, password: string) => {
  const auth = getAuth();
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  const user = getAuth();
  localStorage.clear()
  return await signOut(user);
};

export const register = async (email: string, password: string) => {
  const auth = getAuth();
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const onAuthChange = (callback: NextOrObserver<User>) => {
  const auth = getAuth(app);
  auth.onAuthStateChanged(callback);
};
