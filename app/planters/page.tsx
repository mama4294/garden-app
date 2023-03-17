import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

function Planters() {
  return (
    <div className="h-full flex justify-center items-center animate-pulse">
      <div className="flex gap-2 items-center">
        <ArrowLeftCircleIcon className="h-8 w-8" />
        Select or design new planter
      </div>
    </div>
  );
}

export default Planters;
