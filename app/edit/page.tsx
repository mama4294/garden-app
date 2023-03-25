"use client";

import { useState } from "react";
import Select, { SingleValue } from "react-select";
import Konva from "../../components/Konva";
import { Plant } from "../../typings";

function EditPage() {
  const options: Plant[] = [
    { value: "Tomato", label: "Tomato", color: "red", size: 10 },
    { value: "Basil", label: "Basil", color: "green", size: 40 },
    { value: "Lettuce", label: "Lettuce", color: "green", size: 20 },
    { value: "Cucumber", label: "Cucumber", color: "green", size: 12 },
    { value: "Sunflower", label: "Sunflower", color: "yellow", size: 50 },
  ];

  const [selectedPlant, setSelectedPlant] = useState<Plant>(options[0]);

  const changeSelectedPlant = (e: SingleValue<Plant>) => {
    setSelectedPlant({
      value: e!.value,
      label: e!.label,
      size: e!.size,
      color: e!.color,
    });
  };

  return (
    <div className="flex flex-col gap-4 m-4 md:flex-row">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex gap-2 justify-between items-center md:flex-col ">
          <Select
            options={options}
            onChange={changeSelectedPlant}
            value={selectedPlant}
          />
          <button className="btn btn-sm btn-primary">Save</button>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg flex-1 shadow-md">
        <Konva selectedPlant={selectedPlant} />
      </div>
    </div>
  );
}

export default EditPage;
