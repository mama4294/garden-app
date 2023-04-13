"use client";

import { useCollection } from "react-firebase-hooks/firestore";
import NewPlanterModal from "./NewPlanterModal";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useSession } from "next-auth/react";
import { PlanterItem } from "./PlanterItem";
import Loading from "../../components/Loading";

export const PlanterList = () => {
  const { data: session } = useSession();

  const [planters, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "planters"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex flex-col gap-2 m-4">
      <NewPlanterModal />

      {loading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className=" flex flex-col gap-4 overflow-y-auto">
          {planters?.docs.map((planter) => (
            <PlanterItem key={planter.id} id={planter.id} />
          ))}
        </div>
      )}
    </div>
  );
};
