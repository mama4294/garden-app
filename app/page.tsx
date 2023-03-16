import "../styles/globals.css";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

function HomePage() {
  return (
    <div className="h-full flex-1 text-center flex flex-col justify-center">
      <div className="">
        <h1 className="text-6xl font-bold">
          Garden <p className="text-primary inline-block">Designer</p>
        </h1>
        <p className="mt-3 text-2xl mb-10">Map out your planters</p>
        <button className="btn btn-lg gap-2">
          <PlusCircleIcon className="h-8 w-8" />
          Design New Planter
        </button>
      </div>
    </div>
  );
}

export default HomePage;
