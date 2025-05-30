"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex bg-slate-950 p-5">
      <Link href={"/"} className="mr-5">
        Next.js
      </Link>
      <Link href={"/users"} className="mr-3">
        Users
      </Link>
      <Link href={"/products"} className="mr-3">
        Products
      </Link>
      <Link href={"/admin"} className="mr-3">
        Admin
      </Link>
      {status === "loading" && (
        <span className="loading loading-dots loading-lg"></span>
      )}
      {status === "unauthenticated" && (
        <Link href={"/api/auth/signin"} className="mr-3">
          Sign In
        </Link>
      )}
      {status === "authenticated" && (
        <div className="mr-3">
          {session.user?.name}
          <Link href={"/api/auth/signout"} className="ml-3">
            Sign out
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
