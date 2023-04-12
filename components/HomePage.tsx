"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import { useState } from "react";

function HomePage() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    signIn("google");
    setLoading(true);
  };

  return (
    <div className="h-full text-center flex flex-col justify-center">
      <div className="">
        <h1 className="text-6xl font-bold">
          Garden <p className="text-primary inline-block">Designer</p>
        </h1>
        <p className="mt-3 text-2xl mb-10">Plan your planters</p>
        <button
          className={`btn btn-primary gap-2 ${loading && "loading"}`}
          onClick={handleSignIn}
        >
          {!loading && <PlusCircleIcon className="h-8 w-8" />}
          {loading ? "Loading..." : "Get Started"}
        </button>
      </div>
    </div>
  );
}

export default HomePage;
