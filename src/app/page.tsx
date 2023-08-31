import React from "react";
import Link from "next/link";
import Image from "next/image";
import landing_page from "../../public/landing_page.jpg"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="w-full items-center justify-between">
        <div className="pr-2 pl-2">
          <Image
            src={landing_page}
            className="rounded-md"
            height={400}
            width={400}
            alt="Picture of laundry on countertop"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-white">Manage your household chores more effectively</h1>

        <button className="text-xl font-bold text-white">Sign in with email</button>
        <button className="text-xl font-bold text-white">Sign in with Google</button>

        <div className="text-xs font-bold text-white">By continuing, you agree to the <Link href="/terms">Terms and Conditions</Link></div>
      </div>
    </main>
  );
}
