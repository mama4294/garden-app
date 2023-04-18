type Planter = {
  id: string;
  name: string;
  width: number;
  height: number;
  plants: Shape[];
};

type Plant = {
  value: string;
  label: string;
  size: number;
  color: string;
};

type PlantGroup = {
  label: string;
  options: Plant[];
};

type PageState = {
  mode: MODE;
  selectedPlant: Plant;
  showDimentions: boolean;
};

type Shape = {
  id: string;
  selected: boolean;
  x: number;
  y: number;
  size: number;
  type: string;
  color: string;
};
