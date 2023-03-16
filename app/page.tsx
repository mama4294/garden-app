import "../styles/globals.css";
import { PlanterList } from "./PlanterList";

function HomePage() {
  return (
    <div className="h-full flex-1 text-center flex flex-col justify-center">
      <div className="">
        <h1 className="text-6xl font-bold">
          Garden <p className="text-primary inline-block">Designer</p>
        </h1>
        <p className="mt-3 text-2xl mb-10">Map out your planters</p>
        <div className="mx-10 md:mx-20">
          <PlanterList />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
