import { Stage } from "../components/Stage";
import "../styles/globals.css";

function HomePage() {
  return (
    <div className="h-screen text-center">
      <div className="my-10">
        <h1 className="text-6xl font-bold">
          Welcome to <p className="text-primary inline-block">Gardening</p>
        </h1>
        <p className="mt-3 text-2xl">Map out your planters</p>
      </div>
      <button className="btn btn-lg bg-accent text-accent-content">
        Design New Planter
      </button>
    </div>
  );
}

export default HomePage;
