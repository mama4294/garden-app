"use client";
import { KonvaEventObject } from "konva/lib/Node";
import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Rect,
  Group,
  Line,
  Tag,
  Text,
  Label,
  Shape,
} from "react-konva";
import {
  ACTIONS,
  defaultState,
  planterReducer,
  Shape as ShapeType,
} from "../app/reducers/planterReducer";
import { Plant } from "../typings";

const KonvaCanvas = ({ selectedPlant }: { selectedPlant: Plant }) => {
  const PlanterFrame = ({
    frameWidth,
    frameHeight,
  }: {
    frameWidth: number;
    frameHeight: number;
  }) => {
    const padding = 12;
    const frameColor = "white";
    const fillColor = "lightgreen";

    const FrameTop = () => (
      <Line // Top Frame
        points={[
          0,
          0,
          frameWidth,
          0,
          frameWidth - padding,
          padding,
          padding,
          padding,
        ]}
        closed={true}
        fill={frameColor}
        stroke="black"
        strokeWidth={1}
      />
    );

    const FrameLeft = () => (
      <Line // Top Frame
        points={[
          0,
          0,
          padding,
          padding,
          padding,
          frameHeight - padding,
          0,
          frameHeight,
        ]}
        closed={true}
        fill={frameColor}
        stroke="black"
        strokeWidth={1}
      />
    );
    const FrameBottom = () => (
      <Line // Top Frame
        points={[
          0,
          frameHeight,
          padding,
          frameHeight - padding,
          frameWidth - padding,
          frameHeight - padding,
          frameWidth,
          frameHeight,
        ]}
        closed={true}
        fill={frameColor}
        stroke="black"
        strokeWidth={1}
      />
    );
    const FrameRight = () => (
      <Line // Top Frame
        points={[
          frameWidth,
          0,
          frameWidth,
          frameHeight,
          frameWidth - padding,
          frameHeight - padding,
          frameWidth - padding,
          padding,
        ]}
        closed={true}
        fill={frameColor}
        stroke="black"
        strokeWidth={1}
      />
    );

    const FillArea = () => (
      <Rect // Inside Area
        x={padding}
        y={padding}
        width={frameWidth - padding * 2}
        height={frameHeight - padding * 2}
        fill={fillColor}
      />
    );

    return (
      <Group>
        <FrameTop />
        <FrameLeft />
        <FrameBottom />
        <FrameRight />
        <FillArea />
      </Group>
    );
  };

  const FrameDimentions = ({
    frameWidth,
    frameHeight,
  }: {
    frameWidth: number;
    frameHeight: number;
  }) => {
    const dimentionOffset = 20;
    const arrowOffset = dimentionOffset / 2;
    const arrowSize = 5;

    const ArrowHeight = () => (
      <Shape
        sceneFunc={(ctx, shape) => {
          // top pointer
          ctx.moveTo(frameWidth + arrowOffset + arrowSize, arrowSize);
          ctx.lineTo(frameWidth + arrowOffset, 0);
          ctx.lineTo(frameWidth + arrowOffset - arrowSize, arrowSize);

          // line
          ctx.moveTo(frameWidth + arrowOffset, 0);
          ctx.lineTo(frameWidth + arrowOffset, frameHeight);

          // bottom pointer
          ctx.moveTo(
            frameWidth + arrowOffset + arrowSize,
            frameHeight - arrowSize
          );
          ctx.lineTo(frameWidth + arrowOffset, frameHeight);
          ctx.lineTo(
            frameWidth + arrowOffset - arrowSize,
            frameHeight - arrowSize
          );

          ctx.strokeShape(shape);
        }}
        fill="#00D2FF"
        stroke="gray"
        strokeWidth={0.5}
      />
    );
    const ArrowWidth = () => (
      <Shape
        sceneFunc={(ctx, shape) => {
          // top pointer
          ctx.translate(0, frameHeight + arrowOffset);
          ctx.moveTo(arrowSize, -arrowSize);
          ctx.lineTo(0, 0);
          ctx.lineTo(arrowSize, arrowSize);

          // line
          ctx.moveTo(0, 0);
          ctx.lineTo(frameWidth, 0);

          // bottom pointer
          ctx.moveTo(frameWidth - arrowSize, -arrowSize);
          ctx.lineTo(frameWidth, 0);
          ctx.lineTo(frameWidth - arrowSize, arrowSize);

          ctx.strokeShape(shape);
        }}
        fill="#00D2FF"
        stroke="gray"
        strokeWidth={1}
      />
    );

    const LabelWidth = () => (
      <Label x={frameWidth / 2} y={frameHeight + arrowOffset - arrowSize}>
        <Tag fill="white" stroke="gray" />
        <Text text={`${frameWidth} in`} padding={2} fill="black" />
      </Label>
    );

    const LabelHight = () => (
      <Label x={frameWidth + arrowOffset} y={frameHeight / 2}>
        <Tag fill="white" stroke="gray" />
        <Text text={`${frameHeight} in`} padding={2} fill="black" />
      </Label>
    );

    return (
      <Group>
        <ArrowWidth />
        <LabelWidth />
        <ArrowHeight />
        <LabelHight />
      </Group>
    );
  };

  const newID = () => {
    //creates new id
    return Math.floor(Math.random() * 100).toString();
  };

  //create a reference to a konva stage with type definition
  const canvasRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(planterReducer, defaultState);
  const [mouse, setMouse] = useState<Mouse>({ x: 0, y: 0 });

  type Mouse = {
    x: number;
    y: number;
  };

  const drawShape = (e: KonvaEventObject<MouseEvent>) => {
    const location = stagePositionFromMouse({
      x: e.evt.clientX,
      y: e.evt.clientY,
    });
    dispatch({
      type: ACTIONS.ADD_PLANT,
      payload: {
        x: location.x - selectedPlant.size / 2, //center the plant
        y: location.y - selectedPlant.size / 2, //center the plant
        type: selectedPlant.label,
        color: selectedPlant.color,
        size: selectedPlant.size,
        id: newID(),
        selected: false,
      },
    });
  };

  const selectShape = (e: KonvaEventObject<MouseEvent>) => {
    console.log(e.currentTarget.id);
  };

  const handleDragStart = (e: KonvaEventObject<DragEvent>) => {};

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
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
    setMouse({ x: location.x, y: location.y });
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

  useEffect(() => {
    const handleResize = () => {
      const width = canvasRef!.current!.offsetWidth;
      const height = canvasRef!.current!.offsetHeight;
      const scale = Math.min(width / state.width, height / state.height) * 0.8;

      console.table({ width, height, scale });
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
          onClick={drawShape}
          scaleX={canvasSize.scale}
          scaleY={canvasSize.scale}
          onMouseMove={handleMouseMove}
        >
          <Layer>
            <PlanterFrame frameHeight={state.height} frameWidth={state.width} />
            <FrameDimentions
              frameHeight={state.height}
              frameWidth={state.width}
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
                onClick={selectShape}
              />
            ))}

            {/* Cursor */}
            <Rect
              width={selectedPlant.size}
              height={selectedPlant.size}
              stroke="black"
              fill={selectedPlant.color}
              opacity={0.5}
              x={mouse.x - selectedPlant.size / 2}
              y={mouse.y - selectedPlant.size / 2}
            />
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default KonvaCanvas;
