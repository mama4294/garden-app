"use client";

import {
  Cog6ToothIcon,
  CursorArrowRaysIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import Select, { SingleValue } from "react-select";
import Konva from "../../components/Konva";
import { Plant } from "../../typings";

export enum MODE {
  SELECT = "SELECT",
  ADD = "ADD",
}

function EditPage() {
  const options: Plant[] = [
    { value: "Tomato", label: "Tomato", color: "red", size: 10 },
    { value: "Basil", label: "Basil", color: "green", size: 40 },
    { value: "Lettuce", label: "Lettuce", color: "green", size: 20 },
    { value: "Cucumber", label: "Cucumber", color: "green", size: 12 },
    { value: "Sunflower", label: "Sunflower", color: "yellow", size: 50 },
  ];

  const [selectedPlant, setSelectedPlant] = useState<Plant>(options[0]);
  const [showDimentions, setShowDimentions] = useState<boolean>(true);
  const [mode, setMode] = useState(MODE.ADD);

  const changeSelectedPlant = (e: SingleValue<Plant>) => {
    setMode(MODE.ADD);
    setSelectedPlant({
      value: e!.value,
      label: e!.label,
      size: e!.size,
      color: e!.color,
    });
  };

  const Menu = () => {
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
    };

    return (
      <header className="bg-base-200 p-4 rounded-lg shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className={`btn btn-sm  ${
              mode == MODE.SELECT ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => setMode(MODE.SELECT)}
          >
            <CursorArrowRaysIcon className="h-6 w-6" />
          </button>
          <Select
            className="bg-base-200 fill-base-content"
            options={options}
            onChange={changeSelectedPlant}
            value={selectedPlant}
            styles={customSelectStyles}
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
                      onChange={() => setShowDimentions((prev) => !prev)}
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

  return (
    <div>
      <Menu />
      <div className="bg-base-200 p-4 rounded-lg flex-1 shadow-md m-4">
        <Konva
          selectedPlant={selectedPlant}
          mode={mode}
          showDimentions={showDimentions}
        />
      </div>
    </div>
  );
}

export default EditPage;
