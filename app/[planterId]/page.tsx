"use client";

import { doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import KonvaCanvas from "../../components/Konva";
import { SignIn } from "../../components/SignIn";
import { db } from "../../firebase";
import { plantOptions } from "../constants/plantData";
import { ActionMenu, MODE } from "./ActionMenu";

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

  const [pageState, setPageState] = useState<PageState>({
    mode: MODE.ADD,
    selectedPlant: plantOptions[0].options[0],
    showDimentions: true,
  });

  if (loading) return loadingSpinner();
  if (!data) return noPlanterFound();

  return (
    <div>
      <ActionMenu pageState={pageState} setPageState={setPageState} />
      <div className="bg-base-200 p-4 rounded-lg flex-1 shadow-md m-4">
        <KonvaCanvas pageState={pageState} />
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
