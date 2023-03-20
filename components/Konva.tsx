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

  const stageRef = useRef(null);
  const [state, setState] = useState({ width: 400, height: 150 });

  console.log(stageRef);

  //   const [stageDimentions, setStageDimentions] = useState({
  //     width: stageRef.current?.clientWidth || 500,
  //     height: stageRef.current?.clientHeight || 500,
  //   })

  //   function updateCanvas(widthInput, heightInput, stageRef) {
  //     const layer = stageRef.current.getLayer();
  //     layer.destroyChildren();

  //     const frameWidth = parseInt(widthInput.value, 10);
  //     const frameHeight = parseInt(heightInput.value, 10);

  //     const wr = stageRef.current.width() / frameWidth;
  //     const hr = stageRef.current.height() / frameHeight;

  //     const ratio = Math.min(wr, hr) * 0.8;

  //     const frameOnScreenWidth = frameWidth * ratio;
  //     const frameOnScreenHeight = frameHeight * ratio;

  //     const group = new Konva.Group({});

  //     group.x(Math.round(stageRef.current.width() / 2 - frameOnScreenWidth / 2) + 0.5);
  //     group.y(Math.round(stageRef.current.height() / 2 - frameOnScreenHeight / 2) + 0.5);

  //     layer.add(group);

  //     const frameGroup = createFrame(frameWidth, frameHeight);
  //     frameGroup.scale({ x: ratio, y: ratio });
  //     group.add(frameGroup);

  //     const infoGroup = createInfo(frameOnScreenWidth, frameOnScreenHeight);
  //     group.add(infoGroup);
  //   }

  //   useEffect(() => {
  //     const widthInput = document.getElementById('width-input');
  //     const heightInput = document.getElementById('height-input');

  //     updateCanvas(widthInput, heightInput, stageRef);
  //     setStageDimentions({width: })

  //   }, []);

  return (
    <Stage width={500} height={500} ref={stageRef}>
      <Layer>
        <PlanterFrame frameHeight={state.height} frameWidth={state.width} />
        <FrameDimentions frameHeight={state.height} frameWidth={state.width} />
        <Circle x={200} y={200} stroke="black" radius={50} draggable />
        <Rect width={50} height={50} fill="red" draggable />
      </Layer>
    </Stage>
  );
};

export default Konva;
