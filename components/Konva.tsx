"use client";
import { KonvaEventObject } from "konva/lib/Node";
import Quadtree from "quadtree-lib";
import { Dispatch, useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Tag, Label } from "react-konva";
import { SIZE_MULTIPLIER } from "../app/constants/plantData";
import { Action, ACTIONS } from "../app/reducers/planterReducer";
import { MODE } from "../app/[planterId]/ActionMenu";
import { v4 as uuidv4 } from "uuid";

import FrameDimentions from "./FrameDimentions";
import PlanterFrame from "./PlanterFrame";

interface KeyboardEvent {
  key: string;
}

const KonvaCanvas = ({
  pageState,
  state,
  dispatch,
}: {
  pageState: PageState;
  state: Planter;
  dispatch: Dispatch<Action>;
}) => {
  const { mode, selectedPlant, showDimentions } = pageState;
  const resizedWidth = state.width * SIZE_MULTIPLIER;
  const resizedHeight = state.height * SIZE_MULTIPLIER;

  const GRID_SIZE = 10; //for grid smapping
  let frameSize = 12;

  if (resizedHeight < 50 || resizedWidth < 50)
    frameSize = Math.min(resizedHeight, resizedWidth) / 4;

  type QuadTreeShape = {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  const canvasRef = useRef<HTMLDivElement>(null);
  // const [state, dispatch] = useReducer(planterReducer, defaultState);
  const [cursorBlock, setCursorBlock] = useState<Mouse>({ x: 0, y: 0 });
  const [quadtree] = useState<Quadtree<QuadTreeShape>>(
    new Quadtree({ width: resizedWidth, height: resizedHeight })
  ); //used to store location data of plants for collision detection
  const [hoveredPlant, setHoveredPlant] = useState<Shape | null>(null);

  type Mouse = {
    x: number;
    y: number;
  };

  //Updates quadtree when plants are added or removed
  useEffect(() => {
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
              size: selectedPlant.size * SIZE_MULTIPLIER,
              id: uuidv4(),
              selected: false,
            },
          });
        }
    }
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key == "Delete" || event.key == "Backspace") {
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
    const id = e.target.id();
    if (!id) return;
    //find the plant in the state
    const plant = state.plants.find((plant) => plant.id == id);
    if (!plant) return;
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    const loc = snap({ x: e.target.x(), y: e.target.y() });
    const id = e.target.id();
    const size = state.plants.find((plant) => plant.id == id)?.size;

    const inFrame = locInFrame(loc);
    const collisions = quadtree.colliding({
      x: loc.x,
      y: loc.y,
      width: size,
      height: size,
    });

    if (inFrame && collisions.length == 0) {
      dispatch({
        type: ACTIONS.ADD_PLANT,
        payload: {
          x: e.target.x(),
          y: e.target.y(),
          type: "test",
          color: "purple",
          size: 4,
          id: uuidv4(),
          selected: false,
        },
      });
    } else {
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    const location = stagePositionFromMouse({
      x: e.evt.clientX,
      y: e.evt.clientY,
    });

    const snappedLoc = snap(location);
    setCursorBlock(snappedLoc);
  };

  const snap = ({ x, y }: Mouse): Mouse => {
    const snapX =
      Math.round((x - selectedPlant.size / 2 - frameSize) / GRID_SIZE) *
        GRID_SIZE +
      frameSize;
    const snapY =
      Math.round((y - selectedPlant.size / 2 - frameSize) / GRID_SIZE) *
        GRID_SIZE +
      frameSize;
    return { x: snapX, y: snapY };
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

  const locInFrame = ({ x, y }: { x: number; y: number }) => {
    if (x < frameSize || y < frameSize) return false;
    if (
      x > resizedWidth + frameSize - selectedPlant.size * SIZE_MULTIPLIER ||
      y > resizedHeight + frameSize - selectedPlant.size * SIZE_MULTIPLIER
    )
      return false;
    return true;
  };

  const isMouseInFrame = locInFrame(cursorBlock);
  const isColliding =
    quadtree.colliding({
      x: cursorBlock.x,
      y: cursorBlock.y,
      width: selectedPlant.size * SIZE_MULTIPLIER,
      height: selectedPlant.size * SIZE_MULTIPLIER,
    }).length > 0;
  const isValidPosition = isMouseInFrame && !isColliding;

  useEffect(() => {
    const handleResize = () => {
      const width = canvasRef!.current!.offsetWidth;
      const height = canvasRef!.current!.offsetHeight;
      const scale =
        Math.min(width / resizedWidth, height / resizedHeight) * 0.8;
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

  //Find colors
  let frameColor = canvasRef.current
    ? window.getComputedStyle(canvasRef.current).stroke
    : "gray";
  let fillColor = canvasRef.current
    ? window.getComputedStyle(canvasRef.current).fill
    : "blue";

  useEffect(() => {
    if (canvasRef.current) {
      frameColor = window.getComputedStyle(canvasRef.current).stroke;
      fillColor = window.getComputedStyle(canvasRef.current).fill;
    }
  }, []);

  return (
    <>
      <div className="h-full w-full fill-primary stroke-accent" ref={canvasRef}>
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
              height={resizedHeight}
              width={resizedWidth}
              frameSize={frameSize}
              fillColor={fillColor}
              frameColor={frameColor}
            />
            {showDimentions && (
              <FrameDimentions
                height={resizedHeight}
                width={resizedWidth}
                frameSize={frameSize}
              />
            )}
            {state.plants.map((s: Shape) => (
              <Rect
                key={s.id}
                id={s.id}
                x={s.x}
                y={s.y}
                // draggable
                width={s.size}
                height={s.size}
                stroke="black"
                fill={s.color}
                strokeWidth={s.selected ? 3 : 1}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onClick={toggleSelection}
                onMouseEnter={() => setHoveredPlant(s)}
                onMouseLeave={() => setHoveredPlant(null)}
              />
            ))}
            {/* Cursor */}
            {mode == MODE.ADD && (
              <Rect
                width={selectedPlant.size * SIZE_MULTIPLIER}
                height={selectedPlant.size * SIZE_MULTIPLIER}
                stroke="black"
                fill={isValidPosition ? selectedPlant.color : "gray"}
                opacity={0.5}
                x={cursorBlock.x}
                y={cursorBlock.y}
              />
            )}
          </Layer>
          {/* Tooltip */}
          <Layer>
            {hoveredPlant && mode == MODE.SELECT && (
              <Label
                className="opacity-0 transition-opacity duration-300 bg-pink-50"
                x={hoveredPlant.x + hoveredPlant.size}
                y={hoveredPlant.y + hoveredPlant.size / 2}
              >
                <Tag
                  fill="white"
                  cornerRadius={5}
                  pointerDirection="left"
                  pointerWidth={10}
                  pointerHeight={10}
                  shadowColor="black"
                  shadowBlur={10}
                  shadowOffsetX={10}
                  shadowOffsetY={10}
                  shadowOpacity={0.2}
                />
                <Text text={`${hoveredPlant.type}`} padding={10} fill="black" />
              </Label>
            )}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default KonvaCanvas;
