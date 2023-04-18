"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    console.log("session");
    console.log(session);
  }, [session]);

  const handleGetStarted = async () => {
    if (session) {
      router.replace("/planters");
    } else {
      try {
        setLoading(true);
        await signIn("google");
      } catch (error) {
        setLoading(false);
        console.log("login error");
        console.log(error);
      }
    }
  };

  return (
    //center the div
    <div className="flex justify-center items-center h-full">
      <button
        className={`btn btn-primary gap-2 ${loading && "loading"}`}
        onClick={handleGetStarted}
      >
        {!loading && <PlusCircleIcon className="h-8 w-8" />}
        {loading ? "Loading..." : "Get Started"}
      </button>
    </div>
  );
};
