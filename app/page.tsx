"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HomePage from "../components/HomePage";

function Page() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.replace("/planters");
  }

  return <HomePage />;
}

export default Page;
