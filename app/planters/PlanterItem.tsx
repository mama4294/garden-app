"use client";

import {
  ArrowRightIcon,
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { doc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

import { PlanterPreview } from "../../components/Konva";

import { db } from "../../firebase";

const PlanterItem = ({ state }: { state: Planter }) => {
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

export default PlanterItem;
