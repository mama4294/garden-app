import { PlantGroup } from "../../typings";

export const plantOptions: PlantGroup[] = [
  {
    label: "Fruits",
    options: [
      { value: "Tomato", label: "Tomato", color: "red", size: 10 },
      { value: "Basil", label: "Basil", color: "green", size: 40 },
    ],
  },
  {
    label: "Vegetables",
    options: [
      { value: "Lettuce", label: "Lettuce", color: "green", size: 20 },
      { value: "Cucumber", label: "Cucumber", color: "green", size: 12 },
      { value: "Sunflower", label: "Sunflower", color: "yellow", size: 50 },
    ],
  },
];
