import React from "react";
import Konva from "../../components/Konva";

function EditPage() {
  return (
    <div className="flex flex-col gap-4 m-4 md:flex-row">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex gap-2 justify-between items-center md:flex-col ">
          <p>Shapes</p>
          <button className="btn btn-sm btn-primary">Save</button>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg flex-1 shadow-md">
        <Konva />
      </div>
    </div>
  );
}

export default EditPage;
