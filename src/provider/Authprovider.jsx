import { useEffect, useState, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../firebase/firebase_init";
import UseAxiosPublic, { axiosPublic } from "../hooks/UseAxiosPublic";

export const authContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const  axiosPublic=UseAxiosPublic();

  // Create new user
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in existing user
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error("Login error:", error); // ✅ Log details for debugging
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In
  const googleSign = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      console.error("Google Sign-In error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sync user to backend on auth state change
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser?.email) {
       setUser(currentUser || null);
      setLoading(false);
       const userInfo={email:currentUser?.email};
       axiosPublic.post('/jwt',userInfo)
       .then(res=>{
        if(res.data.token){
          localStorage.setItem('access-token',res.data.token)
        }
       })
        try {
          await axiosPublic.post(`/user/${currentUser.email}`, {
            name: currentUser.displayName || "Anonymous",
            image: currentUser.photoURL || "",
            Email: currentUser.email,
          });
        } catch (error) {
          console.error("Failed to save user in backend:", error);
        }
      }
      else{
        localStorage.removeItem('access-token')
        setUser(null);
        setLoading(false);
      }
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSign,
    logOut,
  };

  return (
    <authContext.Provider value={authInfo}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
