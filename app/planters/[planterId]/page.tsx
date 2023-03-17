import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

type PageProps = {
  params: {
    planterId: string;
  };
};

function PlanterPage(props: PageProps) {
  const planterId = props.params.planterId;

  return (
    <div className="flex justify-center items-center h-full">
      <div className="card card-compact w-96 bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title"> {`Planter ${planterId}`}</h2>
          <div className="card-actions justify-end">
            <button className="btn btn-primary flex gap-1">
              <PencilIcon className="w-6 h-6" />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanterPage;
