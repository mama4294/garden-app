import {
  Cog6ToothIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";
import Select, { SingleValue } from "react-select";
import { plantOptions } from "../constants/plantData";

type Props = {
  pageState: PageState;
  setPageState: (pageState: PageState) => void;
};

export enum MODE {
  SELECT = "SELECT",
  ADD = "ADD",
}

export const ActionMenu = ({ pageState, setPageState }: Props) => {
  const { selectedPlant, mode, showDimentions } = pageState;

  const handleToggleDimentions = () => {
    setPageState({
      ...pageState,
      showDimentions: !showDimentions,
    });
  };

  const handleSetMode = (mode: MODE) => {
    setPageState({
      ...pageState,
      mode,
    });
  };

  const handleChangeSelectedPlant = (e: SingleValue<Plant>) => {
    setPageState({
      ...pageState,
      mode: MODE.ADD,
      selectedPlant: {
        value: e!.value,
        label: e!.label,
        size: e!.size,
        color: e!.color,
      },
    });
  };

  const customSelectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: mode == MODE.ADD ? `hsl(var(--p))` : "inherit",
      // "&:hover": {
      //   backgroundColor: `hsl(var(--bc)`,
      // },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: mode == MODE.ADD ? `hsl(var(--pc))` : "",
    }),
    // groupHeading: (provided: any) => ({
    //   ...provided,
    //   flex: "1 1",
    //   color: "green",
    //   margin: 0,
    // }),
  };

  return (
    <header className="bg-base-200 p-4 rounded-lg shadow-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          className={`btn btn-sm  ${
            mode == MODE.SELECT ? "btn-primary" : "btn-ghost"
          }`}
          onClick={() => handleSetMode(MODE.SELECT)}
        >
          <CursorArrowRaysIcon className="h-6 w-6" />
        </button>
        <Select
          className="bg-base-200 fill-base-content"
          options={plantOptions}
          onChange={handleChangeSelectedPlant}
          value={selectedPlant}
          styles={customSelectStyles}
          isSearchable={true}
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn m-1 btn-sm btn-ghost">
            <Cog6ToothIcon className="h-6 w-6" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Show Dimentions</span>
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={showDimentions}
                    onChange={handleToggleDimentions}
                  />
                </label>
              </div>
            </li>
          </ul>
        </div>

        <button className="btn btn-sm btn-primary">Save</button>
      </div>
    </header>
  );
};
