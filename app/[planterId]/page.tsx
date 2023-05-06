"use client";

import { doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import EditCanvas from "../../components/EditCanvas";
import { SignIn } from "../../components/SignIn";
import { db } from "../../firebase";
import EditPage from "./EditPage";

type PageProps = {
  params: {
    planterId: string;
  };
};

function PlanterPage(props: PageProps) {
  const planterId = props.params.planterId;
  const { data: session } = useSession();

  if (!session) return SignIn();

  const [data, loading] = useDocumentData(
    doc(db, "users", session?.user?.email!, "planters", planterId)
  );

  if (loading) return loadingSpinner();
  if (!data) return noPlanterFound();

  const initialState: Planter = {
    name: data.name,
    width: data.width,
    height: data.height,
    plants: data.plants,
    id: planterId,
  };

  return <EditCanvas />;
  // return <EditPage initialState={initialState} />;
}

const noPlanterFound = () => (
  <div className="flex justify-center items-center w-full">
    <h2 className="text-lg font-bold"> No Planter Found</h2>
  </div>
);

const loadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <div>Loading...</div>;
  </div>
);

export default PlanterPage;
