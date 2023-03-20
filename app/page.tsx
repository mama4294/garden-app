import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function HomePage() {
  return (
    <div className="h-full text-center flex flex-col justify-center">
      <div className="">
        <h1 className="text-6xl font-bold">
          Garden <p className="text-primary inline-block">Designer</p>
        </h1>
        <p className="mt-3 text-2xl mb-10">Map out your planters</p>
        <Link className="btn btn-primary gap-2" href="/planters/">
          <PlusCircleIcon className="h-8 w-8" />
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
