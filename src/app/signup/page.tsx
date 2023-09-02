"use client";
import React, { useState, useEffect } from "react";
import ArrowBackIconRounded from '@mui/icons-material/ArrowBack';
import Link from "next/link";

export default function SignUp() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isPhoneTen, setIsPhoneTen] = useState(false);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState(""); 
    const [arePasswordsMatched, setArePassWordsMatched] = useState(false);
    const [triedSubmit, setTriedSubmit] = useState(false);

    const handleUsername = (e) => {
        setUsername(e);
    }

    const handleEmail = (e) => {
        setEmail(e);
    }

    const handlePhone = (e) => {
        console.log(phone.toString().length);
        if (phone.toString().length < 9) {
            setPhone(e);
        }
    }

    const handlePassWord = (e) => {
        setPassword(e);
    }

    const handlePassWord2 = (e) => {
        setPassword2(e);
    }

    const checkPasswords = () => {
        if (password === password2) {
            return true
        }  else {
            return false
        }
    }

    const checkUsername = () => {
        if (username.trim().length > 0) {
            return true
        }  else {
            return false
        }
    }

    const handleSubmit = (e) => {
        let checks = checkPasswords() && checkUsername();
        e.preventDefault();
        if (checks) {
            return true
            // send information to DB
        } else {
            // check which forms are incorrect
        }
    }

    useEffect(() => {
        if (checkPasswords()) {
            setArePassWordsMatched(true);
        } else {
            setArePassWordsMatched(false);
        }
    }, [password]) 
    
    useEffect(() => {
        if (phone.length < 10) {
            setIsPhoneTen(true);
        } else {
            setIsPhoneTen(false);
        }
    }, [phone])

    useEffect(() => {
        if (checkPasswords()) {
            setArePassWordsMatched(true);
        } else {
            setArePassWordsMatched(false);
        }
    }, [password2])

    return (
        <div className="bg-slate-300 h-full w-full z-30 text-black p-8 rounded-md">
            <Link href="/">
                <ArrowBackIconRounded
                    className="absolute top-5 left-5"
                />
            </Link>
          <div className="text-2xl font-bold p-4 pb-1">Let's get you signed up!</div>
          <form action="POST" className="rounded px-8 pt-3">
            <div className="mb-2">
                <div className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                </div>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="username" type="text" placeholder="Username" 
                onChange={(e) => handleUsername(e.target.value)} 
                />
            </div>
            <div className="mb-2">
                <div className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                </div>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="email" type="text" 
                placeholder="first.lastname@email.com" 
                onChange={(e) => handleEmail(e.target.value)} 
                />
            </div>
            <div className="mb-2">
                <div className="block text-gray-700 text-sm font-bold mb-2">
                    Phone #
                </div>
                <input className={`shadow appearance-none border ${isPhoneTen ? "border-transparent" : "border-red-500"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                id="phone" type="tel" 
                maxLength={10}
                placeholder="xxx-xxx-xxxx" 
                onChange={(e) => handlePhone(e.target.value)} 
                />
                {!isPhoneTen || phone.trim() !== "" && (
                    <p className="text-red-500 text-xs italic">Please enter a valid phone number.</p>
                )}
            </div>
            <div className="mb-2">
                <div className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                </div>
                <input className={`shadow appearance-none border ${arePasswordsMatched ? "border-transparent" : "border-red-500"} rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline`} 
                id="password" type="password" 
                placeholder="******************" 
                onChange={(e) => handlePassWord(e.target.value)}
                />
                {triedSubmit ? <p className="text-red-500 text-xs italic">Please enter a password.</p> : null}
            </div>
            <div className="mb-2">
                <div className="block text-gray-700 text-sm font-bold mb-2" >
                    Confirm password
                </div>
                <input className={`shadow appearance-none border ${arePasswordsMatched ? "border-transparent" : "border-red-500"} rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline`} 
                id="password2" type="password" 
                placeholder="******************" 
                onChange={(e) => handlePassWord2(e.target.value)}
                />
                {(triedSubmit || !arePasswordsMatched) ? <p className="text-red-500 text-xs italic">Passwords must match.</p> : null}
            </div>
            <div className="flex justify-center">
                <button className="border-2 border-zinc-400 bg-black text-white w-1/2 font-bold py-2 px-4 rounded-full" onClick={(e) => handleSubmit(e)}>
                    Sign-Up
                </button>
            </div>
          </form>
          <div className="flex flex-col items-center justify-center text-zinc-400">
            or
            <button className="border-2 border-zinc-400 bg-transparent text-xs text-black w-1/2 py-2 px-4 rounded-full" >Sign in with Google</button>
          </div>
        </div> 
    )
}