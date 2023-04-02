import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const NewPlanterModal = () => {
  const [state, setState] = React.useState({
    name: "Planter 1",
    width: 36,
    height: 12,
  });

  return (
    <div>
      {/* The button to open modal */}
      <label
        className="btn btn-primary  gap-2 flex-nowrap  "
        htmlFor="new-planter-modal"
      >
        <PlusCircleIcon className="h-8 w-8" />
        Design New Planter
      </label>

      <input type="checkbox" id="new-planter-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <input
            type="text"
            placeholder="Planter Name"
            className="input w-full text-lg font-bold pl-0 mb-2"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />

          <div className="mb-6 flex w-full gap-2 flex-col">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Width</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="0.01"
                  className="input input-bordered flex-1 min-w-0 "
                  value={state.width}
                  onChange={(e) =>
                    setState({ ...state, width: Number(e.target.value) })
                  }
                />
                <span>Inches</span>
              </label>
            </div>

            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Height</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="0.01"
                  className="input input-bordered flex-1 min-w-0"
                  value={state.height}
                  onChange={(e) =>
                    setState({ ...state, height: Number(e.target.value) })
                  }
                />
                <span>Inches</span>
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <label
              htmlFor="new-planter-modal"
              className="btn btn-ghost btn-outline"
            >
              Cancel
            </label>
            <Link className="btn btn-primary" href={"/edit"}>
              Create
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPlanterModal;
