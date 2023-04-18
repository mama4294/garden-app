import { SignIn } from "./SignIn";

function HomePage() {
  return (
    <div className="flex-1 flex flex-col justify-center text-center">
      <div className="">
        <h1 className="text-6xl font-bold">
          Garden <p className="text-primary inline-block">Designer</p>
        </h1>
        <p className="mt-3 text-2xl mb-10">Plan your planters</p>
        <SignIn />
      </div>
    </div>
  );
}

export default HomePage;
