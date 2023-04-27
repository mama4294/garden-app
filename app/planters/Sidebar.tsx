"use client";

import { useCollection } from "react-firebase-hooks/firestore";
import NewPlanterModal from "./NewPlanterModal";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useSession } from "next-auth/react";
import { PlanterSidebarItem } from "./PlanterSidebarItem";
import Loading from "../../components/Loading";
import { PlanterMobileList } from "./PlanterMobileItem";

export const Sibebar = () => {
  const { data: session } = useSession();

  const [planters, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "planters"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex flex-1 flex-col gap-2 m-4">
      <NewPlanterModal />

      {loading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className="md:flex flex-1 flex-col gap-4 overflow-y-auto hidden">
          {planters?.docs.map((planter) => (
            <PlanterSidebarItem key={planter.id} id={planter.id} />
          ))}
        </div>
      )}
    </div>
  );
};

//           <div className="md:hidden flex flex-1 flex-col gap-4 overflow-y-auto ">
// {planters?.docs.map((planter) => {
//   console.log(planter);
//   return <PlanterMobileItem key={planter.id} id={planter.id} />;
// })}
// </div>
