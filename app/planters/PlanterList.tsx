"use client";

import {
  ChevronDoubleRightIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useReducer } from "react";
import { Planter } from "../../typings";

export const PlanterList = () => {
  const initialState: Planter[] = [
    { id: 1, name: "Planter 1" },
    { id: 2, name: "Planter 2" },
    { id: 3, name: "Planter 3" },
  ];

  type Action =
    | {
        type: ActionKind.ADD_PLANTER;
        payload: Planter;
      }
    | {
        type: ActionKind.DELETE_PLANTER;
        payload: Number;
      };

  enum ActionKind {
    ADD_PLANTER = "ADD_PLANTER",
    DELETE_PLANTER = "DELETE_PLANTER",
  }

  const stateReducer = (state: Planter[], action: Action) => {
    switch (action.type) {
      case ActionKind.ADD_PLANTER:
        return [...state, action.payload];
      case ActionKind.DELETE_PLANTER:
        return state.filter((planter) => planter.id !== action.payload);
      default:
        const neverEver: never = action;
        console.error("Error: Reducer action not recognized", neverEver);
        return state;
    }
  };

  const [state, dispatch] = useReducer(stateReducer, initialState);

  const PlanterItem = ({ data }: { data: Planter }) => {
    const { name, id } = data;
    return (
      <div className="card w-full bg-base-200 shadow-xl rounded-md">
        <div className="card-body p-4 ">
          <h2 className="card-title">{name}</h2>
          <div className="card-actions justify-end">
            <button
              className="btn btn-cirlce btn-sm"
              onClick={() => handleDeletePlanter(id)}
            >
              <TrashIcon className="w-6 h-6" />
            </button>
            <Link href={`/planters/${id}`}>
              <button className="btn btn-primary btn-sm">
                <ChevronDoubleRightIcon className="w-6 h-6" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const handleNewPlanter = () => {
    const newPlanter: Planter = {
      id: state.length + 1,
      name: `Planter ${state.length + 1}`,
    };
    dispatch({ type: ActionKind.ADD_PLANTER, payload: newPlanter });
  };

  const handleDeletePlanter = (id: Number) => {
    dispatch({ type: ActionKind.DELETE_PLANTER, payload: id });
  };

  return (
    <div className="flex flex-col gap-2 m-4">
      <button className="btn btn-primary gap-2" onClick={handleNewPlanter}>
        <PlusCircleIcon className="h-8 w-8" />
        Design New Planter
      </button>
      <div className=" flex flex-col gap-4 overflow-y-auto">
        {state.map((planter) => (
          <PlanterItem key={planter.id} data={planter} />
        ))}
      </div>
    </div>
  );
};
