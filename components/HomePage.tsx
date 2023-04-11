"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";

function HomePage() {
  return (
    <div className="h-full text-center flex flex-col justify-center">
      <div className="">
        <h1 className="text-6xl font-bold">
          Garden <p className="text-primary inline-block">Designer</p>
        </h1>
        <p className="mt-3 text-2xl mb-10">Plan your planters</p>
        <button
          className="btn btn-primary gap-2"
          onClick={() => signIn("google")}
        >
          <PlusCircleIcon className="h-8 w-8" />
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HomePage;
