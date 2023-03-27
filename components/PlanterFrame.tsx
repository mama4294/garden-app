"use client";

import { Group, Line, Rect } from "react-konva";

const PlanterFrame = ({
  width,
  height,
  padding = 12,
}: {
  width: number;
  height: number;
  padding: number;
}) => {
  const frameColor = "white";
  const fillColor = "lightgreen";

  const FrameTop = () => (
    <Line // Top Frame
      points={[0, 0, width, 0, width - padding, padding, padding, padding]}
      closed={true}
      fill={frameColor}
      stroke="black"
      strokeWidth={1}
    />
  );

  const FrameLeft = () => (
    <Line // Top Frame
      points={[0, 0, padding, padding, padding, height - padding, 0, height]}
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
        height,
        padding,
        height - padding,
        width - padding,
        height - padding,
        width,
        height,
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
        width,
        0,
        width,
        height,
        width - padding,
        height - padding,
        width - padding,
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
      width={width - padding * 2}
      height={height - padding * 2}
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

export default PlanterFrame;
