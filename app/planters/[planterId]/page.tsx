type PageProps = {
  params: {
    planterId: string;
  };
};

function PlanterPage(props: PageProps) {
  const planterId = props.params.planterId;

  return <div>{`Planter ${planterId}`}</div>;
}

export default PlanterPage;
