"use client";
import { KonvaEventObject } from "konva/lib/Node";
import Quadtree from "quadtree-lib";
import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { MODE } from "../app/edit/page";
import {
  ACTIONS,
  defaultState,
  planterReducer,
  Shape,
  Shape as ShapeType,
} from "../app/reducers/planterReducer";
import { Plant } from "../typings";
import FrameDimentions from "./FrameDimentions";
import PlanterFrame from "./PlanterFrame";

interface KeyboardEvent {
  key: string;
}

const KonvaCanvas = ({
  selectedPlant,
  mode,
}: {
  selectedPlant: Plant;
  mode: MODE;
}) => {
  const newID = () => {
    //creates new id
    return Math.floor(Math.random() * 100).toString();
  };

  type Taco = {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  //create a reference to a konva stage with type definition
  const canvasRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(planterReducer, defaultState);
  const [cursorBlock, setCursorBlock] = useState<Mouse>({ x: 0, y: 0 });
  const [quadtree] = useState<Quadtree<Taco>>(
    new Quadtree({ width: state.width, height: state.height })
  );

  //todo: remove from quadtree when deleted

  const GRID_SIZE = 10;

  let FRAME_SIZE = 12;
  if (state.height < 50 || state.width < 50)
    FRAME_SIZE = Math.min(state.height, state.width) / 4;

  type Mouse = {
    x: number;
    y: number;
  };

  useEffect(() => {
    console.log(quadtree);
    quadtree.clear();
    const shapes = state.plants.map((plant) => {
      return {
        x: plant.x,
        y: plant.y,
        width: plant.size,
        height: plant.size,
      };
    });
    quadtree.pushAll(shapes);
  }, [state.plants]);

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    switch (mode) {
      case MODE.ADD:
        if (isValidPosition) {
          dispatch({
            type: ACTIONS.ADD_PLANT,
            payload: {
              x: cursorBlock.x,
              y: cursorBlock.y,
              type: selectedPlant.label,
              color: selectedPlant.color,
              size: selectedPlant.size,
              id: newID(),
              selected: false,
            },
          });
        }
    }
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key == "Delete" || event.key == "Backspace") {
        console.log("deleting selected");
        dispatch({
          type: ACTIONS.DELETED_SELECTED,
        });
      } else if (event.key == "Escape") {
        dispatch({
          type: ACTIONS.DESELECT_ALL,
        });
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleSelection = (e: KonvaEventObject<MouseEvent>) => {
    const id = e.currentTarget.id();
    if (!id) return;
    dispatch({
      type: ACTIONS.TOGGLE_SELECTION,
      payload: {
        id,
      },
    });
  };

  const handleDragStart = (e: KonvaEventObject<DragEvent>) => {
    console.log("dragging");
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    console.log("end drag");
    dispatch({
      type: ACTIONS.MOVES_PLANT,
      payload: {
        x: e.evt.offsetX,
        y: e.evt.offsetY,
        id: e.target.id(),
      },
    });
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    const location = stagePositionFromMouse({
      x: e.evt.clientX,
      y: e.evt.clientY,
    });

    const x =
      Math.round(
        (location.x - selectedPlant.size / 2 - FRAME_SIZE) / GRID_SIZE
      ) *
        GRID_SIZE +
      FRAME_SIZE; //top left of block
    const y =
      Math.round(
        (location.y - selectedPlant.size / 2 - FRAME_SIZE) / GRID_SIZE
      ) *
        GRID_SIZE +
      FRAME_SIZE;

    setCursorBlock({ x, y });
  };

  const stagePositionFromMouse = ({ x, y }: { x: number; y: number }) => {
    const canvasRect = canvasRef!.current!.getBoundingClientRect();
    const posX = (x - canvasRect.left) / canvasSize.scale;
    const posY = (y - canvasRect.top) / canvasSize.scale;
    return { x: posX, y: posY };
  };

  const [canvasSize, setCanvasSize] = useState({
    width: 300,
    height: 300,
    scale: 1,
  });

  const locInFrame = (x: number, y: number) => {
    if (x < FRAME_SIZE || y < FRAME_SIZE) return false;
    if (
      x > state.width + FRAME_SIZE - selectedPlant.size ||
      y > state.height + FRAME_SIZE - selectedPlant.size
    )
      return false;
    return true;
  };

  const isMouseInFrame = locInFrame(cursorBlock.x, cursorBlock.y);
  const isColliding =
    quadtree.colliding({
      x: cursorBlock.x,
      y: cursorBlock.y,
      width: selectedPlant.size,
      height: selectedPlant.size,
    }).length > 0;
  const isValidPosition = isMouseInFrame && !isColliding;

  useEffect(() => {
    const handleResize = () => {
      const width = canvasRef!.current!.offsetWidth;
      const height = canvasRef!.current!.offsetHeight;
      const scale = Math.min(width / state.width, height / state.height) * 0.8;
      setCanvasSize({
        width,
        height,
        scale,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [state]);

  return (
    <>
      {/* <div className="p-2">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Frame Width</span>
          </label>
          <input
            value={state.width}
            className="input input-bordered w-full"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: ACTIONS.CHANGE_PLANTER_WIDTH,
                payload: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Frame Height</span>
          </label>
          <input
            value={state.height}
            className="input input-bordered w-full"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: ACTIONS.CHANGE_PLANTER_HEIGHT,
                payload: Number(e.target.value),
              })
            }
          />
        </div>
      </div> */}
      <div className="h-full w-full " ref={canvasRef}>
        <Stage
          width={canvasSize.width}
          height={canvasSize.height}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          scaleX={canvasSize.scale}
          scaleY={canvasSize.scale}
        >
          <Layer>
            <PlanterFrame
              height={state.height}
              width={state.width}
              frameSize={FRAME_SIZE}
            />
            <FrameDimentions
              height={state.height}
              width={state.width}
              frameSize={FRAME_SIZE}
            />
            {state.plants.map((s: ShapeType) => (
              <Rect
                key={s.id}
                id={s.id}
                x={s.x}
                y={s.y}
                draggable
                width={s.size}
                height={s.size}
                stroke="black"
                fill={s.color}
                strokeWidth={s.selected ? 3 : 1}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onClick={toggleSelection}
              />
            ))}
            {/* Cursor */}
            {mode == MODE.ADD && (
              <Rect
                width={selectedPlant.size}
                height={selectedPlant.size}
                stroke="black"
                fill={isValidPosition ? selectedPlant.color : "gray"}
                opacity={0.5}
                x={cursorBlock.x}
                y={cursorBlock.y}
              />
            )}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default KonvaCanvas;
