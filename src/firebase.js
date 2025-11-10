import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { 
  addDoc, 
  collection, 
  getFirestore 
} from "firebase/firestore";
import { toast } from "react-toastify";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });

      return { success: true };
    } catch (error) {
      console.log(error);
      const message = error.code?.split("/")[1]?.replace(/-/g, " ") || "SignUp failed";
      toast.error(message);
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      console.log(error);
      const message = error.code?.split("/")[1]?.replace(/-/g, " ") || "Login failed";
      toast.error(message);
      return { success: false, error: error.message };
    }
  };

const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully"); 
    } catch (error) {
      console.error("Sign-out error:", error);
      toast.error("Logout failed"); 
    }
  };
  

export { auth, db, login, signUp, logout };
