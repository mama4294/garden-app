"use client";

import { useReducer, useState } from "react";
import KonvaCanvas from "../../components/Konva";
import { plantOptions } from "../constants/plantData";
import { planterReducer } from "../reducers/planterReducer";
import { ActionMenu, MODE } from "./ActionMenu";

type Props = {
  initialState: Planter;
};

export const EditPage = ({ initialState }: Props) => {
  const [pageState, setPageState] = useState<PageState>(
    //initial page state
    {
      mode: MODE.ADD,
      selectedPlant: plantOptions[0].options[0], //Select the first plant in the first group
      showDimentions: true,
    }
  );

  const [state, dispatch] = useReducer(planterReducer, initialState);

  return (
    <div className="flex-1">
      <ActionMenu pageState={pageState} setPageState={setPageState} />
      <div className="bg-base-200 p-4 rounded-lg flex-1 shadow-md m-4">
        <KonvaCanvas pageState={pageState} state={state} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default EditPage;
