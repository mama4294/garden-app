import { useEffect, useRef, useState } from "react";
import {
  getViewport,
  panCamera,
  zoomCamera,
  zoomIn,
  zoomOut,
} from "./CameraNavigation";

export default function EditCanvas() {
  const ref = useRef<SVGSVGElement>(null);

  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0,
    z: 1,
  });

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

  const plantsArray: Shape[] = [
    {
      id: "1",
      selected: false,
      x: 0,
      y: 0,
      size: 20,
      type: "Rose",
      color: "red",
    },
    {
      id: "2",
      selected: false,
      x: 202,
      y: 102,
      size: 40,
      type: "Rose",
      color: "blue",
    },
  ];

  const Planter: Planter = {
    id: "1",
    name: "Test Planter",
    width: 36,
    height: 24,
    plants: plantsArray,
  };

  return (
    <div>
      <svg ref={ref} className="fixed top-0 left-0 w-full h-full">
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
          {Object.values(plantsArray).map((shape: Shape) => (
            <rect
              key={shape.id}
              id={shape.id}
              x={shape.x}
              y={shape.y}
              width={shape.size}
              height={shape.size}
              fill="white"
              stroke="black"
              strokeWidth={4}
              rx={4}

              //   onPointerDown={onPointerDown}
              //   onPointerMove={onPointerMove}
              //   onPointerUp={onPointerUp}
            />
          ))}

          {/* {Array.from(Array(100)).map((_, i) => (
            <use
              key={i}
              href="#box"
              x={(i % 10) * 200}
              y={Math.floor(i / 10) * 200}
            />
          ))} */}
        </g>
      </svg>
      <div>
        <button
          style={{ position: "relative", zIndex: 9999 }}
          onClick={() => setCamera(zoomIn)}
        >
          Zoom In
        </button>
        <button
          style={{ position: "relative", zIndex: 9999 }}
          onClick={() => setCamera(zoomOut)}
        >
          Zoom Out
        </button>
        <div>{Math.floor(camera.z * 100)}%</div>
        <div>x: {Math.floor(viewport.minX)}</div>
        <div>y: {Math.floor(viewport.minY)}</div>
        <div>width: {Math.floor(viewport.width)}</div>
        <div>height: {Math.floor(viewport.height)}</div>
      </div>
    </div>
  );
}
