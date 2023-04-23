"use client";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { PlanterPreview } from "../../../components/Konva";
import { db } from "../../../firebase";

type PageProps = {
  params: {
    planterId: string;
  };
};

function PlanterPage(props: PageProps) {
  const planterId = props.params.planterId;
  const router = useRouter();
  const { data: session } = useSession();
  const [data, loading] = useDocumentData(
    doc(db, "users", session?.user?.email!, "planters", planterId)
  );

  const handleDelete = async () => {
    await deleteDoc(
      doc(db, "users", session?.user?.email!, "planters", planterId)
    );
    router.replace("/planters");
  };

  if (loading) return loadingSpinner();
  if (!data) return noPlanterFound();

  const state = {
    name: data.name,
    width: data.width,
    height: data.height,
    plants: data.plants,
    id: planterId,
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="card card-compact w-96 bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title"> {data?.name}</h2>
          <PlanterPreview state={state} />
          <div className="card-actions justify-between">
            <button className="btn btn-ghost flex gap-1" onClick={handleDelete}>
              <TrashIcon className="w-6 h-6" />
              Delete
            </button>
            <Link className="btn btn-primary flex gap-1" href={`/${planterId}`}>
              <PencilIcon className="w-6 h-6" />
              Design
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const noPlanterFound = () => (
  <div className="card-body">
    <h2 className="card-title"> No Planter Found</h2>
  </div>
);

const loadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <div>Loading...</div>;
  </div>
);

export default PlanterPage;
