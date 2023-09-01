import { auth } from "../../../firebaseClient.js";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signInWithPhoneNumber as firebaseSignInWithPhoneNumber,
  ApplicationVerifier,
} from "firebase/auth";

interface SignInWithEmailArgs {
  email: string;
  password: string;
}

interface SignInWithPhoneNumberArgs {
  phoneNumber: string;
  appVerifier: ApplicationVerifier;
}

export const signInWithEmail = async ({
  email,
  password,
}: SignInWithEmailArgs) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in with email", error);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const signInWithPhoneNumber = async ({
  phoneNumber,
  appVerifier,
}: SignInWithPhoneNumberArgs) => {
  try {
    await firebaseSignInWithPhoneNumber(auth, phoneNumber, appVerifier);
  } catch (error) {
    console.error("Error signing in with phone number", error);
    throw error;
  }
};
