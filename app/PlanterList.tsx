"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useReducer } from "react";
import { Planter } from "../typings";

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
        return { ...state, [action.payload.name]: action.payload };
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
    const { name } = data;
    return <button className="btn">{name}</button>;
  };

  return (
    <div className="flex flex-col gap-2">
      <button className="btn btn-primary gap-2">
        <PlusCircleIcon className="h-8 w-8" />
        Design New Planter
      </button>
      {state.map((planter) => (
        <PlanterItem key={planter.id} data={planter} />
      ))}
    </div>
  );
};
