import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  getInitialFittedCamera,
  getViewport,
  panCamera,
  centerInViewport,
  zoomCamera,
  zoomIn,
  zoomOut,
  zoomTo,
} from "./CameraNavigation";
import { Context, stateMachine } from "./StateMachine";
import { useMachine } from "@xstate/react";
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const SIZE_MULTIPLIER = 10;

export default function EditCanvas({ planter }: { planter: PlanterState }) {
  const context: Context = {
    hoverId: null,
    cursor: { x: 0, y: 0 },
    shapes: planter.plants,
    selection: [],
  };

  const ref = useRef<SVGSVGElement>(null);
  const [state, send] = useMachine(stateMachine, { context: context });

  const initialViewport = {
    minX: 0,
    minY: 0,
    maxX: window.innerWidth,
    maxY: window.innerHeight,
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const initialCamera = getInitialFittedCamera(
    initialViewport,
    planter.width * SIZE_MULTIPLIER,
    planter.height * SIZE_MULTIPLIER
  );

  //Camera is the top left point of the viewport. It is panned and zoomed to see different areas of the canvas.
  const [camera, setCamera] = useState<Camera>(initialCamera);

  const rDragging = useRef<{
    shape: Shape;
    origin: Point;
  } | null>(null);

  const fitCamera = () => {
    setCamera(
      centerInViewport(
        {
          x: viewport.height / 2 - (planter.width * SIZE_MULTIPLIER) / 2,
          y: viewport.width / 2 - (planter.height * SIZE_MULTIPLIER) / 2,
        },
        planter.width * SIZE_MULTIPLIER,
        planter.height * SIZE_MULTIPLIER,
        viewport,
        camera
      )
    );
  };

  useEffect(() => {
    console.log("dragging", rDragging);
  }, [rDragging]);

  useEffect(() => {
    // Handles zooming and panning
    function handleWheel(event: WheelEvent) {
      event.preventDefault();
      const { clientX, clientY, deltaX, deltaY, ctrlKey } = event;

      if (ctrlKey) {
        setCamera((camera: Camera) =>
          zoomCamera(camera, { x: clientX, y: clientY }, deltaY / 100)
        );
      } else {
        setCamera((camera: Camera) => panCamera(camera, deltaX, deltaY));
      }
    }

    const elm = ref.current;
    if (!elm) return;

    elm.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      elm.removeEventListener("wheel", handleWheel);
    };
  }, [ref]);

  const transform = `scale(${camera.z}) translate(${camera.x}px, ${camera.y}px)`;

  const isPanning = state.matches("pan");
  const isSelecting = state.matches("cursor");
  const isAdding = state.matches("add");

  const cursorLoc = {
    x: state.context.cursor.x - camera.x,
    y: state.context.cursor.y - camera.y,
  };

  //Viewport is the device screen size. Does not change unless the screen does.
  const viewport = getViewport(camera, {
    minX: 0,
    minY: 0,
    maxX: window.innerWidth,
    maxY: window.innerHeight,
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handlePointerDown = (e: React.PointerEvent<SVGElement>) => {
    if (isPanning) {
      send("START_PAN");
    }
  };

  const handlePointeMove = (e: React.PointerEvent<SVGElement>) => {
    if (state.matches("pan.panning")) {
      const dx = -e.movementX;
      const dy = -e.movementY;

      setCamera((camera: Camera) => panCamera(camera, dx, dy));
    }
    if (isAdding) {
      send("MOVE_CURSOR", { cursor: { x: e.clientX, y: e.clientY } });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<SVGElement>) => {
    return send("END_PAN");
  };

  return (
    <div>
      <svg
        ref={ref}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointeMove}
        onPointerUp={handlePointerUp}
        className={`fixed top-0 left-0 w-full h-full 
        ${isPanning && "cursor-grab"}
        ${state.matches("pan.panning") && "cursor-grabbing"}`}
      >
        <defs>
          <rect id="box" x="100" y="100" height="100" width="100" />
        </defs>

        <g style={{ transform }}>
          {/* Frame */}
          <rect
            x={0}
            y={0}
            width={planter.width * SIZE_MULTIPLIER}
            height={planter.height * SIZE_MULTIPLIER}
            fill="white"
            stroke="black"
            strokeWidth={4}
            rx={4}
          />
          {/* Plants */}
          {Object.values(state.context.shapes).map((shape: Shape) => {
            const isHovered = shape.id === state.context.hoverId;
            const isSelected = state.context.selection.includes(shape.id);
            return (
              <rect
                key={shape.id}
                id={shape.id}
                x={shape.x}
                y={shape.y}
                width={shape.size * SIZE_MULTIPLIER}
                height={shape.size * SIZE_MULTIPLIER}
                fill={shape.color}
                stroke={isHovered || isSelected ? "blue" : "black"}
                strokeWidth={4}
                rx={4}
                // onPointerDown={() => send({ type: "HOVER", id: shape.id })}
                // onPointerMove={onPointerMove}
                onPointerDown={() =>
                  send({ type: "SELECT_SHAPE", id: shape.id })
                }
                onPointerOver={() => send({ type: "HOVER", id: shape.id })}
                onPointerOut={() => send("UNHOVER")}
              />
            );
          })}
          {/* Add Shape Cursor */}
          {isAdding && (
            <rect
              x={cursorLoc.x}
              y={cursorLoc.y}
              width={10}
              height={10}
              fill="white"
              stroke="black"
              strokeWidth={4}
              rx={4}
            />
          )}
        </g>
      </svg>
      {/* Bottom actiom menu */}
      <div className="fixed bottom-0 left-0 flex justify-between w-full m-1">
        {/* Zoom section */}
        <ZoomActions
          camera={camera}
          setCamera={setCamera}
          handleFitPlanter={fitCamera}
        />

        {/* Mode section */}
        <div className="flex gap-1 bg-base-200 rounded-2xl ">
          <button
            className={`btn ${isSelecting ? "btn-primary " : "btn-ghost"}`}
            onClick={() => send("SELECT_CURSOR")}
          >
            Cursor
          </button>
          <button
            className={`btn ${isPanning ? "btn-primary " : "btn-ghost"}`}
            onClick={() => send("SELECT_PAN")}
          >
            Pan
          </button>
          <button
            className={`btn ${isAdding ? "btn-primary " : "btn-ghost"}`}
            onClick={() => send("SELECT_ADD")}
          >
            Add
          </button>
          <button
            disabled={!state.can("DELETE_SELECTION")}
            className={`btn btn-ghost`}
            onClick={() => send("DELETE_SELECTION")}
          >
            <TrashIcon className="h-6 w-6" />
          </button>
        </div>
        <div></div>
      </div>

      <div className="fixed top-50 left-0">
        <div>Camera x: {Math.floor(camera.x)}</div>
        <div>Camera y: {Math.floor(camera.y)}</div>
        <div>Camera Z: {camera.z}</div>
        <div>width: {Math.floor(viewport.width)}</div>
        <div>height: {Math.floor(viewport.height)}</div>
        <div>
          state:
          {JSON.stringify(state.value)}
        </div>
        <div>
          context:
          {JSON.stringify(state.context)}
        </div>
      </div>
    </div>
  );
}

const ZoomActions = ({
  camera,
  setCamera,
  handleFitPlanter,
}: {
  camera: Camera;
  setCamera: Dispatch<SetStateAction<Camera>>;
  handleFitPlanter: () => void;
}) => {
  return (
    <div className="flex gap-1 items-center">
      <button className="btn btn-ghost" onClick={() => setCamera(zoomOut)}>
        <MagnifyingGlassMinusIcon className="h-6 w-6" />
      </button>

      {/* Dropdown zoom menu */}
      <div className="dropdown dropdown-top">
        <label tabIndex={0} className="btn btn-ghost">
          <div>{Math.floor(camera.z * 100)}%</div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-base-content rounded-box w-52 "
        >
          <button
            className="btn btn-ghost"
            onClick={() => setCamera(zoomTo(camera, 0.25))}
          >
            <p>25%</p>
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => setCamera(zoomTo(camera, 0.5))}
          >
            <p>50%</p>
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => setCamera(zoomTo(camera, 0.75))}
          >
            <p>75%</p>
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => setCamera(zoomTo(camera, 1))}
          >
            <p>100%</p>
          </button>
          <button className="btn btn-ghost" onClick={handleFitPlanter}>
            <p>Fit</p>
          </button>
        </ul>
      </div>

      <button
        className="btn btn-ghost relative z-50"
        onClick={() => setCamera(zoomIn)}
      >
        <MagnifyingGlassPlusIcon className="h-6 w-6" />
      </button>
    </div>
  );
};
