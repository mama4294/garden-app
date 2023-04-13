"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    await signIn("google");
    setLoading(true);
  };

  return (
    //center the div
    <div className="flex justify-center items-center h-full">
      <button
        className={`btn btn-primary gap-2 ${loading && "loading"}`}
        onClick={handleSignIn}
      >
        {!loading && <PlusCircleIcon className="h-8 w-8" />}
        {loading ? "Loading..." : "Get Started"}
      </button>
    </div>
  );
};
