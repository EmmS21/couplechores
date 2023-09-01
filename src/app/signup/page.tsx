"use client";
import React, { useState, useEffect } from "react";
import ArrowBackIconRounded from '@mui/icons-material/ArrowBack';
import Link from "next/link";

export default function SignUp() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
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
        setPhone(e);
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
        e.preventDefault();
        if (checkPasswords() && checkUsername()) {
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
        if (checkPasswords()) {
            setArePassWordsMatched(true);
        } else {
            setArePassWordsMatched(false);
        }
    }, [password2])

    return (
        <div className="bg-slate-300 h-full w-full overflow-y-auto z-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black p-8 rounded-md">
            <Link href="/">
                <ArrowBackIconRounded
                    className="absolute top-5 left-5"
                />
            </Link>
          <div className="text-2xl font-bold p-4 pb-2">Welcome to CouplesChore. Let's get you signed up!</div>
          <form action="POST" className="rounded px-8 pt-3 pb-8 mb-2">
            <div className="mb-2">
                <div className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                </div>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={(e) => handleUsername(e.target.value)} />
            </div>
            <div className="mb-2">
                <div className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                </div>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="first.lastname@email.com" onChange={(e) => handleEmail(e.target.value)} />
            </div>
            <div className="mb-2">
                <div className="block text-gray-700 text-sm font-bold mb-2">
                    Phone #
                </div>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="xxx-xxx-xxxx" onChange={(e) => handlePhone(e.target.value)} />
            </div>
            <div className="mb-2">
                <div className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                </div>
                <input className={`shadow appearance-none border ${arePasswordsMatched ? "border-transparent" : "border-red-500"} rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline`} id="password" type="password" placeholder="******************" onChange={(e) => handlePassWord(e.target.value)}/>
                {triedSubmit ? null : <p className="text-red-500 text-xs italic">Please enter a password.</p>}
            </div>
            <div className="mb-2">
                <div className="block text-gray-700 text-sm font-bold mb-2" >
                    Confirm password
                </div>
                <input className={`shadow appearance-none border ${arePasswordsMatched ? "border-transparent" : "border-red-500"} rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline`} id="password2" type="password" placeholder="******************" onChange={(e) => handlePassWord2(e.target.value)}/>
                {triedSubmit ? null : <p className="text-red-500 text-xs italic">Passwords must match.</p>}
            </div>
            <div className="flex justify-center mb-2">
                <button className="border-2 border-zinc-400 text-black w-1/2 font-bold py-2 px-4 rounded-full" onClick={(e) => handleSubmit(e)}>
                    Sign-Up
                </button>
            </div>
          </form>
        </div> 
    )
}