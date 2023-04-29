"use client";

import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loading from "../../components/Loading";
import { db } from "../../firebase";
import NewPlanterModal from "./NewPlanterModal";
import PlanterItem from "./PlanterItem";

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
        return <PlanterItem key={state.id} state={state} />;
      })}
    </div>
  );
};
