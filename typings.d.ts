type Planter = {
  id: string;
  name: string;
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
