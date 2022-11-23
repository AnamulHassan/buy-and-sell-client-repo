import React, { createContext, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { useEffect } from 'react';
import app from '../firebase/firebase.config';

const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();

const AuthContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUserWithEmailPass = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, providerGoogle);
  };
  const userInfoUpdate = (name, imgUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: imgUrl,
    });
  };
  const loginWithEmailAndPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const userLogout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const userInfo = {
    user,
    createUserWithEmailPass,
    userInfoUpdate,
    loginWithGoogle,
    userLogout,
    loginWithEmailAndPassword,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
