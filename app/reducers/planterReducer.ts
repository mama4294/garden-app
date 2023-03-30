export enum ACTIONS {
  ADD_PLANT = "ADD_PLANT",
  MOVE_PLANT = "MOVE_PLANT",
  DELETED_SELECTED = "DELETED_SELECTED",
  TOGGLE_SELECTION = "TOGGLE_SELECTION",
  DESELECT_ALL = "DESELECT_ALL",
  CHANGE_PLANTER_WIDTH = "CHANGE_PLANTER_WIDTH",
  CHANGE_PLANTER_HEIGHT = "CHANGE_PLANTER_HEIGHT",
  CHANGE_PLANT = "CHANGE_PLANT",
  CLEAR = "CLEAR",
}

type Action =
  | {
      type: ACTIONS.CHANGE_PLANTER_WIDTH | ACTIONS.CHANGE_PLANTER_HEIGHT;
      payload: number;
    }
  | {
      type: ACTIONS.ADD_PLANT;
      payload: Shape;
    }
  | {
      type: ACTIONS.CLEAR | ACTIONS.DELETED_SELECTED | ACTIONS.DESELECT_ALL;
    }
  | {
      type: ACTIONS.TOGGLE_SELECTION;
      payload: { id: string };
    }
  | {
      type: ACTIONS.MOVE_PLANT;
      payload: {
        x: number;
        y: number;
        id: string;
      };
    };

export type Shape = {
  id: string;
  selected: boolean;
  x: number;
  y: number;
  size: number;
  type: string;
  color: string;
};

type State = {
  plants: Shape[];
  width: number;
  height: number;
};

export const defaultState: State = {
  plants: [],
  width: 350, //inches
  height: 200, //inches
};

export const planterReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ACTIONS.CHANGE_PLANTER_HEIGHT:
      return { ...state, height: action.payload };
    case ACTIONS.CHANGE_PLANTER_WIDTH:
      return { ...state, width: action.payload };
    case ACTIONS.ADD_PLANT:
      return { ...state, plants: [...state.plants, { ...action.payload }] };
    case ACTIONS.MOVE_PLANT:
      const plant = state.plants.find((plant) => plant.id == action.payload.id);
      if (!plant) return state;
      return {
        ...state,
        plants: [
          ...state.plants,
          { ...plant, x: action.payload.x, y: action.payload.y },
        ],
      };
    case ACTIONS.TOGGLE_SELECTION:
      const newPlants = state.plants.map((plant: Shape) => {
        if (plant.id === action.payload.id) {
          return { ...plant, selected: !plant.selected };
        }
        return plant;
      });
      return { ...state, plants: newPlants };

    case ACTIONS.DESELECT_ALL:
      const newPlants2 = state.plants.map((plant: Shape) => {
        return { ...plant, selected: false };
      });
      return { ...state, plants: newPlants2 };
    case ACTIONS.CLEAR:
      return { ...state, plants: [] };
    case ACTIONS.DELETED_SELECTED:
      return {
        ...state,
        plants: state.plants.filter((s: Shape) => !s.selected),
      };
    default:
      return state;
  }
};
