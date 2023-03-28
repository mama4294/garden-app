export enum ACTIONS {
  ADD_PLANT = "ADD_PLANT",
  MOVES_PLANT = "MOVES_PLANT",
  DELETED_SELECTED = "DELETED_SELECTED",
  SELECT_PLANT = "SELECT_PLANT",
  UNSELECT_PLANT = "UNSELECT_PLANT",
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
      type: ACTIONS.CLEAR | ACTIONS.DELETED_SELECTED;
    }
  | {
      type: ACTIONS.SELECT_PLANT;
      payload: { id: string };
    }
  | {
      type: ACTIONS.MOVES_PLANT;
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
    case ACTIONS.MOVES_PLANT:
      return state;
    case ACTIONS.SELECT_PLANT:
      const newPlants = state.plants.map((plant: Shape) => {
        if (plant.id === action.payload.id) {
          return { ...plant, selected: true };
        }
        return plant;
      });
      return { ...state, plants: newPlants };
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
