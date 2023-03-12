function Grid() {
  return (
    <div className="bg-[#F7FAFD] w-full max-w-md p-2 mx-auto rounded-2xl border-[#E7EDF1] border-8 aspect-square">
      <div className="grid gap-1 bg-white grid-cols-5 grid-rows-5 rounded-lg overflow-hidden">
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
    </div>
  );
}

function Cell() {
  return (
    <div className="h-full w-full bg-[#EEF3F7] hover:bg-yellow-200 aspect-square"></div>
  );
}

export default Grid;
