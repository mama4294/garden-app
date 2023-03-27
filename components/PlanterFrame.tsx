"use client";

// import { Group, Line, Rect } from "react-konva";

// const PlanterFrame = ({
//   width,
//   height,
//   padding,
// }: {
//   width: number;
//   height: number;
//   padding: number;
// }) => {
//   const frameColor = "white";
//   const fillColor = "lightgreen";

//   const FrameTop = () => (
//     <Line // Top Frame
//       points={[0, 0, width, 0, width - padding, padding, padding, padding]}
//       closed={true}
//       fill={frameColor}
//       stroke="black"
//       strokeWidth={1}
//     />
//   );

//   const FrameLeft = () => (
//     <Line // Top Frame
//       points={[0, 0, padding, padding, padding, height - padding, 0, height]}
//       closed={true}
//       fill={frameColor}
//       stroke="black"
//       strokeWidth={1}
//     />
//   );
//   const FrameBottom = () => (
//     <Line // Top Frame
//       points={[
//         0,
//         height,
//         padding,
//         height - padding,
//         width - padding,
//         height - padding,
//         width,
//         height,
//       ]}
//       closed={true}
//       fill={frameColor}
//       stroke="black"
//       strokeWidth={1}
//     />
//   );
//   const FrameRight = () => (
//     <Line // Top Frame
//       points={[
//         width,
//         0,
//         width,
//         height,
//         width - padding,
//         height - padding,
//         width - padding,
//         padding,
//       ]}
//       closed={true}
//       fill={frameColor}
//       stroke="black"
//       strokeWidth={1}
//     />
//   );

//   const FillArea = () => (
//     <Rect // Inside Area
//       x={padding}
//       y={padding}
//       width={width - padding * 2}
//       height={height - padding * 2}
//       fill={fillColor}
//     />
//   );

//   return (
//     <Group>
//       <FrameTop />
//       <FrameLeft />
//       <FrameBottom />
//       <FrameRight />
//       <FillArea />
//     </Group>
//   );
// };

// export default PlanterFrame;

import { Group, Line, Rect } from "react-konva";

const PlanterFrame = ({
  width,
  height,
  frameSize,
}: {
  width: number;
  height: number;
  frameSize: number;
}) => {
  const frameColor = "white";
  const fillColor = "lightgreen";

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
