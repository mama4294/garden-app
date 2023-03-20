"use client";

import { useEffect, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Group,
  Line,
  Shape,
  Tag,
  Text,
  Label,
} from "react-konva";

const Konva = () => {
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

  const stageRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ width: 400, height: 150 });

  console.log(stageRef);

  //Canvas container dimensions so that the canvas can be resized to full fill the container
  const [canvasDimention, setCanvasDimention] = useState({
    width: stageRef.current?.clientWidth || 500,
    height: stageRef.current?.clientHeight || 500,
  });

  //Used to update the canvas when the window is resized
  useEffect(() => {
    const handleResize = () => {
      const resizedDimentions = {
        width: stageRef.current?.clientWidth || 500,
        height: stageRef.current?.clientHeight || 500,
      };

      setCanvasDimention(resizedDimentions);
      console.table(resizedDimentions);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  //Calculate the ratio to scale the frame depending on the container size
  const ratioWidth = canvasDimention.width / state.width;
  const ratioHeight = canvasDimention.height / state.height;
  const ratio = Math.min(ratioWidth, ratioHeight) * 0.8;

  const frameOnScreenWidth = state.width * ratio;
  const frameOnScreenHeight = state.height * ratio;

  //center the frame on the screen
  const frameX =
    Math.round(canvasDimention.width / 2 - frameOnScreenWidth / 2) + 0.5;
  const frameY =
    Math.round(canvasDimention.height / 2 - frameOnScreenHeight / 2) + 0.5;

  return (
    <div className="h-full w-full " ref={stageRef}>
      <Stage width={canvasDimention.width} height={canvasDimention.height}>
        <Layer x={frameX} y={frameY} scaleX={ratio} scaleY={ratio}>
          <Group>
            <PlanterFrame frameHeight={state.height} frameWidth={state.width} />
            <FrameDimentions
              frameHeight={state.height}
              frameWidth={state.width}
            />
            {/* <Circle x={200} y={200} stroke="black" radius={50} draggable />
            <Rect width={50} height={50} fill="red" draggable /> */}
          </Group>
        </Layer>
      </Stage>
    </div>
  );
};

export default Konva;

//   import './styles.css';
//   import { Stage, Layer, Rect, Circle, Star } from 'react-konva';
//   import { v4 } from 'uuid';
//   import { ACTIONS, defaultState, shapeReducer } from './reducer';
//   import { useReducer } from 'react';

//   export default function App() {
//     const [shapeState, dispatch] = useReducer(shapeReducer, defaultState);

//     const drawShape = (e) => {
//       dispatch({
//         type: ACTIONS.ADD_SHAPE,
//         payload: {
//           x: e.evt.offsetX,
//           y: e.evt.offsetY,
//           type: shapeState.currentShape,
//           color: shapeState.color,
//           id: v4(),
//           selected: false
//         }
//       });
//     };

//     const handleDragStart = (e) => {};

//     const handleDragEnd = (e) => {
//       dispatch({
//         type: ACTIONS.MOVES_SHAPE,
//         x: e.evt.offsetX,
//         y: e.evt.offsetY,
//         id: e.target.id()
//       });
//     };

//     const onSelect = (e) => {
//       e.cancelBubble = true;
//       const id = e.target.id();

//       const shape = shapeState.shapes.find((s) => s.id === id);

//       dispatch({
//         type: shape.selected ? ACTIONS.UNSELECT_SHAPE : ACTIONS.SELECT_SHAPE,
//         payload: { id }
//       });
//     };

//     return (
//       <div className="container">
//         <div className="row">
//           <div className="column">
//             <h1>React Konva Drawing App</h1>
//           </div>
//         </div>
//         <div className="row">
//           <main>
//             <Stage
//               style={{ border: 'solid black' }}
//               width={500}
//               height={500}
//               onClick={drawShape}
//             >
//               <Layer>
//                 {shapeState.shapes.map((s) => {
//                   switch (s.type) {
//                     case 'circle':
//                       return (
//                         <Circle
//                           key={s.id}
//                           id={s.id}
//                           x={s.x}
//                           y={s.y}
//                           draggable
//                           radius={50}
//                           strokeWidth={s.selected ? 3 : 0}
//                           stroke="black"
//                           fill={s.color}
//                           onDragStart={handleDragStart}
//                           onDragEnd={handleDragEnd}
//                           onClick={onSelect}
//                         />
//                       );
//                     case 'rectangle':
//                       return (
//                         <Rect
//                           key={s.id}
//                           id={s.id}
//                           x={s.x}
//                           y={s.y}
//                           draggable
//                           width={50}
//                           height={50}
//                           stroke="black"
//                           fill={s.color}
//                           strokeWidth={s.selected ? 3 : 0}
//                           onDragStart={handleDragStart}
//                           onDragEnd={handleDragEnd}
//                           onClick={onSelect}
//                         />
//                       );
//                     case 'star':
//                       return (
//                         <Star
//                           key={s.id}
//                           id={s.id}
//                           x={s.x}
//                           y={s.y}
//                           draggable
//                           width={80}
//                           height={80}
//                           fill={s.color}
//                           stroke="black"
//                           strokeWidth={s.selected ? 3 : 0}
//                           onDragStart={handleDragStart}
//                           onDragEnd={handleDragEnd}
//                           numPoints={5}
//                           innerRadius={20}
//                           outerRadius={50}
//                           onClick={onSelect}
//                         />
//                       );

//                     default:
//                       return <></>;
//                   }
//                 })}
//               </Layer>
//             </Stage>
//           </main>
//         </div>

//         <div className="row">
//           <div className="column">
//             <label htmlFor="shape">Shape</label>
//             <select
//               value={shapeState.currentShape}
//               onChange={(e) =>
//                 dispatch({
//                   type: ACTIONS.CHANGE_SHAPE,
//                   payload: e.target.value
//                 })
//               }
//               id="shape"
//             >
//               <option value="circle">Circle</option>
//               <option value="rectangle">Rectangle</option>
//               <option value="star">Star</option>
//             </select>
//           </div>
//         </div>
//         <div className="row">
//           <div className="column">
//             <input
//               value={shapeState.color}
//               type="color"
//               onChange={(e) =>
//                 dispatch({ type: ACTIONS.CHANGE_COLOR, payload: e.target.value })
//               }
//               name=""
//               id=""
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="column">
//             <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
//               Clear
//             </button>
//           </div>
//           <div className="column">
//             <button onClick={() => dispatch({ type: ACTIONS.DELETED_SELECTED })}>
//               Remove Selected
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

// export const ACTIONS = Object.freeze({
//     CHANGE_COLOR: 'CHANGE_COLOR',
//     ADD_CIRCLE: 'ADD_SHAPE',
//     CLEAR: 'CLEAR',
//     MOVES_SHAPE: 'MOVE_SHAPE',
//     SELECT_SHAPE: 'SELECT_SHAPE',
//     UNSELECT_SHAPE: 'UNSELECT_SHAPE',
//     CHANGE_SHAPE: 'CHANGE_SHAPE',
//     DELETED_SELECTED: 'DELETED_SELECTED'
//   });

//   export const shapeReducer = (state, action) => {
//     switch (action.type) {
//       case ACTIONS.CHANGE_COLOR:
//         return {
//           ...state,
//           color: action.payload,
//           shapes: state.shapes.map((s) => {
//             return { ...s, color: s.selected ? action.payload : s.color };
//           })
//         };
//       case ACTIONS.ADD_SHAPE:
//         return { ...state, shapes: [...state.shapes, { ...action.payload }] };
//       case ACTIONS.CLEAR:
//         return { ...state, shapes: [] };
//       case ACTIONS.SELECT_SHAPE:
//       case ACTIONS.UNSELECT_SHAPE:
//         const shape = state.shapes.find((s) => s.id === action.payload.id);
//         return {
//           ...state,
//           shapes: [
//             ...state.shapes.filter((s) => s.id !== action.payload.id),
//             { ...shape, selected: action.type === ACTIONS.SELECT_SHAPE }
//           ]
//         };
//       case ACTIONS.CHANGE_SHAPE:
//         return {
//           ...state,
//           currentShape: action.payload
//         };
//       case ACTIONS.DELETED_SELECTED:
//         return {
//           ...state,
//           shapes: state.shapes.filter((s) => !s.selected)
//         };
//       default:
//         return state;
//     }
//   };

//   export const defaultState = {
//     shapes: [],
//     currentShape: 'star',
//     color: '#AA0000'
//   };
