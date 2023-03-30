"use client";

import {
  CursorArrowRaysIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
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
  const [showDimentions, setShowDimentions] = useState<boolean>(false);

  const changeSelectedPlant = (e: SingleValue<Plant>) => {
    setSelectedPlant({
      value: e!.value,
      label: e!.label,
      size: e!.size,
      color: e!.color,
    });
  };

  const [mode, setMode] = useState(MODE.ADD);

  return (
    <div className="flex flex-col gap-4 m-4 md:flex-row">
      <div className="bg-base-200 p-4 rounded-lg shadow-md">
        <div className="flex gap-2 justify-between items-center md:flex-col ">
          <button
            className={`btn btn-sm  ${
              mode == MODE.SELECT ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => setMode(MODE.SELECT)}
          >
            <CursorArrowRaysIcon className="h-6 w-6" />
          </button>
          <button
            className={`btn btn-sm  ${
              mode == MODE.ADD ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => setMode(MODE.ADD)}
          >
            <PlusIcon className="h-6 w-6" />
          </button>
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => console.log("delete")}
          >
            <TrashIcon className="h-6 w-6" />
          </button>
          <Select
            options={options}
            onChange={changeSelectedPlant}
            value={selectedPlant}
          />
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
          <button className="btn btn-sm btn-primary">Save</button>
        </div>
      </div>
      <div className="bg-base-200 p-4 rounded-lg flex-1 shadow-md">
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
