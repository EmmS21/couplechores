"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import landing_page from "../../public/landing_page.jpg";
import ArrowBackIconRounded from '@mui/icons-material/ArrowBack';
import Link from "next/link";
import RootLayout from "./layout";
import { metadata } from "../../metadata";
import {
  signInWithEmail,
  signInWithGoogle,
  signInWithPhoneNumber,
} from "./auth/firebaseAuthHelpers";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

export default function Home() {
  const [showingTNC, setShowingTNC] = useState(false);
  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);
  const auth = getAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const verifier = new RecaptchaVerifier(auth, "sign-in-button", {
          size: "invisible",
          callback: (response: any) => {},
        });
        setRecaptchaVerifier(verifier);
      } catch (error) {
        console.error("Error creating RecaptchaVerifier:", error);
      }
    }
  }, []);

  const handleSignInWithEmail = async () => {
    const email = prompt("Enter your email");
    const password = prompt("Enter your password");
    if (email && password) {
      await signInWithEmail({ email, password });
    }
  };

  const handleSignInWithPhoneNumber = async () => {
    const phoneNumber = prompt("Enter your phone number");
    if (phoneNumber && recaptchaVerifier) {
      await signInWithPhoneNumber({
        phoneNumber,
        appVerifier: recaptchaVerifier,
      });
    }
  };

  const signUpFunct = () => {
    console.log("signUpFunct called for sign-up");
  };
  const toggleTNC = () => {
    setShowingTNC(!showingTNC);
  };

  return (
    <RootLayout metadata={metadata}>
      <main
        className="relative flex min-h-screen flex-col items-center justify-between p-4"
        id="overlay"
      >
        {showingTNC ? (
          <div className="bg-zinc-500 h-full w-full overflow-y-auto z-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-8 rounded-md">
            <ArrowBackIconRounded
              className="absolute top-5 left-5"
              onClick={toggleTNC}
              data-testid="ArrowBackIcon"
            />
            <div className="text-2xl font-bold text-white p-4">
              Terms and Conditions
            </div>
            <div className="text-xs text-white p-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <div className="text-xs text-white p-4">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <div className="text-xs text-white p-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          </div>
        ) : null}
        <div className="w-full items-center justify-center">
          <div className="pr-2 pl-2">
            <Image
              src={landing_page}
              className="rounded-md"
              height={400}
              width={400}
              alt="Picture of laundry on countertop"
            />
          </div>

          <h1 className="text-2xl font-bold text-white p-4">
            Manage your household chores more effectively
          </h1>
          <div className="flex text-xs items-center justify-center font-bold text-zinc-400">
            Sign in with:
          </div>
          <div className="flex flex-col items-center justify-center gap-4 font-bold text-white p-4">
            <button
              className="border-2 border-transparent bg-blue-500 w-1/2 font-bold py-2 px-4 rounded-full"
              onClick={handleSignInWithEmail}
            >
              Email
            </button>
            <button
              className="border-2 border-zinc-400 bg-black w-1/2 font-bold py-2 px-4 rounded-full"
              onClick={signInWithGoogle}
            >
              Google
            </button>
            <button
              className="border-2 border-zinc-400 bg-transparent w-1/2 font-bold py-2 px-4 rounded-full"
              onClick={handleSignInWithPhoneNumber}
            >
              Phone #
            </button>
          </div>
          <div className="flex flex-col items-center justify-center text-xs font-bold text-zinc-400">
            Don't have an account?{" "}
            <span className="text-white" onClick={signUpFunct}>
              Register here
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-xxs font-bold text-zinc-500 p-2">
            By continuing, you agree to the{" "}
            <span className="underline underline-offset-2" onClick={toggleTNC}>
              Terms and Conditions
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-xs font-bold text-zinc-400">Don't have an account? <Link href="/signup" className="text-white">Register here</Link></div>
        <div className="flex flex-col items-center justify-center text-xxs font-bold text-zinc-500 p-2">By continuing, you agree to the <span className="underline underline-offset-2" onClick={toggleTNC}>Terms and Conditions</span></div>
      </div>
    </main>
   </RootLayout>
  );
}
