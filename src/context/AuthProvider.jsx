"use client";

import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* register functionality start */
  const createUserFunction = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  /* register functionality end */

  /* update user functionality start */
  const updateUserFunction = (name, photoURL) => {
    if (!auth.currentUser) {
      return;
    }

    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };
  /* update user functionality end */

  /* loagin User functionality start */
  const loginUserFunctionality = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  /* loagin User functionality end */

  /* unSubscribe functionnality start */
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);
  /* unSubscribe functionnality end */

  const authInfo = {
    user,
    loading,
    createUserFunction,
    updateUserFunction,
    loginUserFunctionality,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
