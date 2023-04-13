"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useReducer, useState } from "react";
import { Planter } from "../../typings";
import { useCollection } from "react-firebase-hooks/firestore";
import NewPlanterModal from "./NewPlanterModal";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useSession } from "next-auth/react";
import { PlanterItem } from "./PlanterItem";

export const PlanterList = () => {
  const { data: session } = useSession();

  const [planters, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "planters"),
        orderBy("createdAt", "asc")
      )
  );

  console.log(planters);

  // const initialState: Planter[] = [
  //   { id: 1, name: "Planter 1" },
  //   { id: 2, name: "Planter 2" },
  //   { id: 3, name: "Planter 3" },
  // ];

  // type Action =
  //   | {
  //       type: ActionKind.ADD_PLANTER;
  //       payload: Planter;
  //     }
  //   | {
  //       type: ActionKind.DELETE_PLANTER;
  //       payload: Number;
  //     };

  // enum ActionKind {
  //   ADD_PLANTER = "ADD_PLANTER",
  //   DELETE_PLANTER = "DELETE_PLANTER",
  // }

  // const stateReducer = (state: Planter[], action: Action) => {
  //   switch (action.type) {
  //     case ActionKind.ADD_PLANTER:
  //       return [...state, action.payload];
  //     case ActionKind.DELETE_PLANTER:
  //       return state.filter((planter) => planter.id !== action.payload);
  //     default:
  //       const neverEver: never = action;
  //       console.error("Error: Reducer action not recognized", neverEver);
  //       return state;
  //   }
  // };

  // const [state, dispatch] = useReducer(stateReducer, initialState);

  // const handleNewPlanter = () => {
  //   const newPlanter: Planter = {
  //     id: state.length + 1,
  //     name: `Planter ${state.length + 1}`,
  //   };
  //   dispatch({ type: ActionKind.ADD_PLANTER, payload: newPlanter });
  // };

  // const handleDeletePlanter = (id: Number) => {
  //   dispatch({ type: ActionKind.DELETE_PLANTER, payload: id });
  // };

  // const PlanterItem = ({ id }: { id: string }) => {
  //   const pathName = usePathname();
  //   const [selected, setSelected] = useState(false);

  //   //sets which planter is selected based on the URL so that the background color changes
  //   useEffect(() => {
  //     if (!pathName) return;
  //     setSelected(pathName === `/planters/${id}`);
  //   }, [pathName]);

  //   return (
  //     <Link
  //       href={`/planters/${id}`}
  //       className={`card w-full cursor-pointer hover:shadow p-4 rounded-md hover:bg-base-200  ${
  //         selected && "bg-base-200 shadow"
  //       }`}
  //     >
  //       <p className="text-sm md:text-base font-bold">{id}</p>
  //     </Link>
  //   );
  // };

  console.log("planters", planters);
  console.table(planters?.docs);

  return (
    <div className="flex flex-col gap-2 m-4">
      <NewPlanterModal />
      <div className=" flex flex-col gap-4 overflow-y-auto">
        {planters?.docs.map((planter) => (
          <PlanterItem key={planter.id} id={planter.id} />
        ))}

        {/* {planters?.docs.map((planter) => (
          <PlanterItem key={planter.id} data={planter.name} />
        ))} */}
      </div>
    </div>
  );
};
