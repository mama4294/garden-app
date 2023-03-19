"use client";

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
          ctx.moveTo(-arrowOffset - arrowSize, arrowSize);
          ctx.lineTo(-arrowOffset, 0);
          ctx.lineTo(-arrowOffset + arrowSize, arrowSize);

          // line
          ctx.moveTo(-arrowOffset, 0);
          ctx.lineTo(-arrowOffset, frameHeight);

          // bottom pointer
          ctx.moveTo(-arrowOffset - arrowSize, frameHeight - arrowSize);
          ctx.lineTo(-arrowOffset, frameHeight);
          ctx.lineTo(-arrowOffset + arrowSize, frameHeight - arrowSize);

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
        <Text text={`${frameHeight} in`} padding={2} fill="black" />
      </Label>
    );

    return (
      <Group>
        <ArrowWidth />
        <LabelWidth />
      </Group>
    );
  };

  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
    <Stage width={600} height={600}>
      <Layer>
        <PlanterFrame frameHeight={300} frameWidth={400} />
        <FrameDimentions frameHeight={300} frameWidth={400} />
        <Circle x={200} y={200} stroke="black" radius={50} draggable />
        <Rect width={50} height={50} fill="red" draggable />
      </Layer>
    </Stage>
  );
};

export default Konva;
