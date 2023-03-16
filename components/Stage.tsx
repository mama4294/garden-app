"use client";

import { useReducer } from "react";
import { InputGroup } from "./InputGroup";

export const Stage = () => {
  type State = {
    planterWidth: number;
    planterLength: number;
  };

  type Action = {
    type: ActionKind.CHANGE_WIDTH | ActionKind.CHANGE_LENGTH;
    payload: number;
  };

  enum ActionKind {
    CHANGE_WIDTH = "CHANGE_WIDTH",
    CHANGE_LENGTH = "CHANGE_LENGTH",
  }

  const initialState = {
    planterWidth: 10,
    planterLength: 10,
  };

  const stateReducer = (state: State, action: Action) => {
    switch (action.type) {
      case ActionKind.CHANGE_LENGTH:
        return { ...state, planterLength: action.payload };
      case ActionKind.CHANGE_WIDTH:
        return { ...state, planterWidth: action.payload };
      default:
        // const neverEver: never = action;
        // console.error("Error: State reducer action not recognized", neverEver);
        return state;
    }
  };

  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <div>
      <div className="grid gap-6 place-self-center mb-6 md:grid-cols-2 text-left text-sm font-medium text-gray-900 dark:text-white my-4">
        <InputGroup
          label="Planter Length"
          placeholder="10"
          value={state.planterLength}
          unit="inches"
          onChange={(e) =>
            dispatch({
              type: ActionKind.CHANGE_LENGTH,
              payload: Number(e.target.value),
            })
          }
        />
        <InputGroup
          label="Planter Width"
          placeholder="10"
          value={state.planterWidth}
          unit="inches"
          onChange={(e) =>
            dispatch({
              type: ActionKind.CHANGE_WIDTH,
              payload: Number(e.target.value),
            })
          }
        />
      </div>
      <GridTable length={state.planterLength} width={state.planterWidth} />
    </div>
  );
};

const GridTable = ({ length, width }: { length: number; width: number }) => {
  const generateArray = (width: number) => {
    return [...Array(width)].map((_, x) => 0);
  };

  const generateArrayOfArrays = (length: number, width: number) => {
    return [...Array(length)].map((_, y) => generateArray(width));
  };

  const gridData = generateArrayOfArrays(length, width);
  console.table(gridData);

  return (
    <div className="flex justify-center items-center">
      <div className=" border-gray-500 p-2 border-4 rounded">
        <table className="table-fixed border-gray-500 border-2 rounded">
          <tbody>
            {gridData.map((row, y) => (
              <tr>
                {row.map((col, x) => (
                  <td className="border border-gray-200 h-4 w-4 hover:bg-yellow-200"></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
