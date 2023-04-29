"use client";

import {
  ArrowRightIcon,
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { collection, doc, orderBy, query, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { PlanterPreview } from "../../components/Konva";
import Loading from "../../components/Loading";
import { db } from "../../firebase";
import NewPlanterModal from "./NewPlanterModal";

export const PlanterMobileList = () => {
  const { data: session } = useSession();

  const [planters, loading] = useCollectionData(
    session &&
      query(
        collection(db, "users", session.user?.email!, "planters"),
        orderBy("createdAt", "asc")
      )
  );

  if (loading) return <Loading />;
  if (!planters) return <div>No data</div>;

  return (
    <div className="flex gap-6 flex-col p-5 w-full h-full items-center overflow-auto">
      <NewPlanterModal />
      {planters.map((data) => {
        const state = {
          name: data.name,
          width: data.width,
          height: data.height,
          plants: data.plants,
          id: data.id,
        };
        return <PlanterMobileItem key={state.id} state={state} />;
      })}
    </div>
  );
};

const PlanterMobileItem = ({ state }: { state: Planter }) => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(state.name);

  const handleClear = () => {
    setTitle(state.name);
    setIsEditing(false);
  };

  const handleRename = () => {
    setIsEditing(false);
    try {
      updateDoc(doc(db, "users", session?.user?.email!, "planters", state.id), {
        name: title,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card card-compact w-full bg-base-200 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between">
          <input
            type="text"
            disabled={!isEditing}
            placeholder="Planter Title"
            className="input w-full card-title mr-4 disabled:cursor-auto"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />

          <div className="flex gap-1">
            {!isEditing && (
              <button
                className="btn btn-ghost p-1"
                onClick={() => setIsEditing(true)}
              >
                <PencilIcon className="w-6 h-6" />
              </button>
            )}
            {isEditing && (
              <>
                <button className="btn btn-ghost p-1" onClick={handleRename}>
                  <CheckIcon className="w-6 h-6" />
                </button>
                <button className="btn btn-ghost p-1" onClick={handleClear}>
                  <XCircleIcon className="w-6 h-6" />
                </button>
              </>
            )}
            {!isEditing && (
              <button
                className="btn btn-ghost p-1"
                onClick={() => alert("Delete")}
              >
                <TrashIcon className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        <PlanterPreview state={state} />
        <div className="card-actions justify-end">
          <Link className="btn btn-primary flex gap-1" href={`/${state.id}`}>
            Design
            <ArrowRightIcon className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};
