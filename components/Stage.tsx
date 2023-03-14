import { useReducer } from "react";
import Canvas from "./Canvas";

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
      {/* <Canvas /> */}
      <Grid length={state.planterLength} width={state.planterWidth} />
      <div className="grid gap-6 mb-6 md:grid-cols-2 text-left text-sm font-medium text-gray-900 dark:text-white">
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Planter Width
          </label>
          <div className="flex">
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="10"
              value={state.planterWidth}
              onChange={(e) =>
                dispatch({
                  type: ActionKind.CHANGE_WIDTH,
                  payload: Number(e.target.value),
                })
              }
            />
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-r-lg border-l-0 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              inches
            </span>
          </div>
        </div>
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Planter Length
          </label>
          <div className="flex">
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border rounded-none rounded-l-lg border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="10"
              value={state.planterLength}
              onChange={(e) =>
                dispatch({
                  type: ActionKind.CHANGE_LENGTH,
                  payload: Number(e.target.value),
                })
              }
            />
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-r-lg border-l-0 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              inches
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Grid = ({ length, width }: { length: number; width: number }) => {
  const numsquares = length * width;
  return (
    <div className="grid grid-cols-10 mb-10">
      {[...Array(length)].map((_, y) => (
        <>
          {[...Array(width)].map((_, x) => (
            <Square label={`${x},${y}`} />
          ))}
        </>
      ))}

      {/* {[...Array(numsquares)].map((_, i) => (
        <Square label={i.toString()} />
      ))} */}
    </div>
  );
};

const Square = ({ label }: { label: string }) => {
  return <p className="bg-gray-100 p-2 hover:bg-yellow-300">{label}</p>;
};
