"use client";

import { Group, Line, Rect } from "react-konva";

const PlanterFrame = ({
  width,
  height,
  frameSize,
  frameColor,
  fillColor,
  x = 0,
  y = 0,
}: {
  width: number;
  height: number;
  x?: number;
  y?: number;
  frameSize: number;
  frameColor: string;
  fillColor: string;
}) => {
  // const frameColor = "green";
  // const fillColor = "gray";

  const FrameTop = () => (
    <Line // Top Frame
      points={[
        0,
        0,
        width + frameSize * 2,
        0,
        width + frameSize,
        frameSize,
        frameSize,
        frameSize,
      ]}
      closed={true}
      fill={frameColor}
      stroke="black"
      strokeWidth={1}
    />
  );

  const FrameLeft = () => (
    <Line // Left Frame
      points={[
        0, // x1
        0, // y1
        frameSize, // x2
        frameSize, // y2
        frameSize, // x3
        height + frameSize, // y3
        0, // x4
        height + frameSize * 2, // y4
      ]}
      closed={true}
      fill={frameColor}
      stroke="black"
      strokeWidth={1}
    />
  );

  const FrameBottom = () => (
    <Line // Bottom Frame
      points={[
        0, // x1
        height + frameSize * 2, // y1
        width + frameSize * 2, // x2
        height + frameSize * 2, // y2
        width + frameSize, // x3
        height + frameSize, // y3
        frameSize, // x4
        height + frameSize, // y4
        0, // x5
        height + frameSize * 2, // y5
      ]}
      closed={true}
      fill={frameColor}
      stroke="black"
      strokeWidth={1}
    />
  );

  const FrameRight = () => (
    <Line // Right Frame
      points={[
        width + frameSize * 2, // x1
        0, // y1
        width + frameSize * 2,
        height + frameSize * 2,
        width + frameSize,
        height + frameSize,
        width + frameSize,
        frameSize,
      ]}
      closed={true}
      fill={frameColor}
      stroke="black"
      strokeWidth={1}
    />
  );

  const FillArea = () => (
    <Rect // Inside Area
      x={frameSize}
      y={frameSize}
      width={width}
      height={height}
      fill={fillColor}
    />
  );

  return (
    <Group x={x} y={y}>
      <FrameTop />
      <FrameLeft />
      <FrameBottom />
      <FrameRight />
      <FillArea />
    </Group>
  );
};

export default PlanterFrame;
