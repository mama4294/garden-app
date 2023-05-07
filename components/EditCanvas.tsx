import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  canvasToScreen,
  getViewport,
  panCamera,
  screenToCanvas,
  zoomCamera,
  zoomIn,
  zoomOut,
  zoomTo,
} from "./CameraNavigation";
import { stateMachine } from "./StateMachine";
import { useMachine } from "@xstate/react";
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { assign } from "xstate";

const subtract = (point1: Point, point2: Point): Point => {
  return { x: point1.x - point2.x, y: point1.y - point2.y };
};

const addition = (point1: Point, point2: Point): Point => {
  return { x: point1.x + point2.x, y: point1.y + point2.y };
};

export default function EditCanvas() {
  const ref = useRef<SVGSVGElement>(null);
  const [state, send] = useMachine(stateMachine);

  // function send(event: any, payload: any) {
  //   console.log("Event:", event, ", Payload:", payload);
  //   sendMachine(event, payload);
  // }

  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0,
    z: 1,
  });

  const rDragging = useRef<{
    shape: Shape;
    origin: Point;
  } | null>(null);

  useEffect(() => {
    console.log("dragging", rDragging);
  }, [rDragging]);

  // function onPointerDown(e: React.PointerEvent<SVGElement>) {
  //   console.log("down");
  //   e.currentTarget.setPointerCapture(e.pointerId);

  //   const id = e.currentTarget.id;
  //   if (!id) return;
  //   send("addId", { count: id });
  //   const point = { x: e.clientX, y: e.clientY };

  //   rDragging.current = {
  //     shape: { ...shapes[id] },
  //     origin: point,
  //   };
  // }

  function onPointerMove(e: React.PointerEvent<SVGElement>) {
    const dragging = rDragging.current;
    if (!dragging) return;
    console.log("move");
    const shape = shapes[dragging.shape.id];
    if (!shape) return;
    const screenPoint = { x: e.clientX, y: e.clientY };
    const delta = subtract(screenPoint, dragging.origin);
    const newPoint = addition(shape, delta);
    const point = screenToCanvas(newPoint, camera);

    setShapes({
      ...shapes,
      [shape.id]: {
        ...shape,
        x: point.x,
        y: point.y,
      },
    });
  }

  const onPointerUp = (e: React.PointerEvent<SVGElement>) => {
    console.log("up");
    e.currentTarget.releasePointerCapture(e.pointerId);
    rDragging.current = null;
  };

  useEffect(() => {
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

  const viewport = getViewport(camera, {
    minX: 0,
    minY: 0,
    maxX: window.innerWidth,
    maxY: window.innerHeight,
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [shapes, setShapes] = useState<Record<string, Shape>>({
    a: {
      id: "1",
      selected: false,
      x: 0,
      y: 0,
      size: 20,
      type: "Rose",
      color: "red",
    },
    "2": {
      id: "2",
      selected: false,
      x: 202,
      y: 102,
      size: 40,
      type: "Rose",
      color: "blue",
    },
  });

  const Planter = {
    id: "1",
    name: "Test Planter",
    width: 36,
    height: 24,
    plants: shapes,
  };

  const isPanning = state.value == "pan";
  const isSelecting = state.value == "select";
  const isAdding = state.value == "add";

  return (
    <div>
      <svg
        ref={ref}
        className={`fixed top-0 left-0 w-full h-full ${
          isPanning && "cursor-pointer"
        }`}
      >
        <defs>
          <rect id="box" x="100" y="100" height="100" width="100" />
        </defs>

        <g style={{ transform }}>
          {/* Frame */}
          <rect
            x={0}
            y={0}
            width={Planter.width * 10}
            height={Planter.height * 10}
            fill="white"
            stroke="black"
            strokeWidth={4}
            rx={4}
          />
          {/* Plants */}
          {Object.values(shapes).map((shape: Shape) => (
            <rect
              key={shape.id}
              id={shape.id}
              x={shape.x}
              y={shape.y}
              width={shape.size}
              height={shape.size}
              fill={shape.color}
              stroke="black"
              strokeWidth={4}
              rx={4}
              // onPointerDown={() => send({ type: "HOVER", id: shape.id })}
              // onPointerMove={onPointerMove}
              // onPointerUp={onPointerUp}
              onPointerOver={() => send({ type: "HOVER", id: shape.id })}
              onPointerOut={() => send("UNHOVER")}
            />
          ))}
          {/* Add Shape Cursor */}
          <rect
            x={12}
            y={12}
            width={10}
            height={10}
            fill="white"
            stroke="black"
            strokeWidth={4}
            rx={4}
          />
        </g>
      </svg>
      {/* Bottom actiom menu */}
      <div className="fixed bottom-0 left-0 flex justify-between w-full m-1">
        {/* Zoom section */}
        <ZoomActions camera={camera} setCamera={setCamera} />

        {/* Mode section */}
        <div className="flex gap-1 bg-base-200 rounded-2xl ">
          <button
            className={`btn ${
              state.matches("cursor") ? "btn-primary " : "btn-ghost"
            }`}
            onClick={() => send("SELECT_CURSOR")}
          >
            Cursor
          </button>
          <button
            className={`btn ${
              state.value == "pan" ? "btn-primary " : "btn-ghost"
            }`}
            onClick={() => send("SELECT_PAN")}
          >
            Pan
          </button>
          <button
            className={`btn ${
              state.matches("add") ? "btn-primary " : "btn-ghost"
            }`}
            onClick={() => send("SELECT_ADD")}
          >
            Add
          </button>
          <button
            disabled
            className={`btn btn-ghost`}
            onClick={() => send("SELECT_ADD")}
          >
            <TrashIcon className="h-6 w-6" />
          </button>
        </div>
        <div></div>
      </div>

      <div className="fixed top-50 left-0">
        <div>
          state:{" "}
          {JSON.stringify({ value: state.value, context: state.context })}
        </div>
        <div>Viewport x: {Math.floor(viewport.minX)}</div>
        <div>Viewport y: {Math.floor(viewport.minY)}</div>
        <div>width: {Math.floor(viewport.width)}</div>
        <div>height: {Math.floor(viewport.height)}</div>
      </div>
    </div>
  );
}

const ZoomActions = ({
  camera,
  setCamera,
}: {
  camera: Camera;
  setCamera: Dispatch<SetStateAction<Camera>>;
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
