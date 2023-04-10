"use client";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import { DIMENTION_MULTIPLIER } from "../app/constants";
import PlanterFrame from "./PlanterFrame";

const PlanterPreview = ({
  width: inputWidth,
  height: inputHeight,
}: {
  width: number;
  height: number;
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const frameWidth = inputWidth * DIMENTION_MULTIPLIER;
  const frameHeight = inputHeight * DIMENTION_MULTIPLIER;

  let frameSize = 12;
  if (frameHeight < 50 || frameWidth < 50)
    frameSize = Math.min(frameHeight, frameWidth) / 4;

  const [canvasSize, setCanvasSize] = useState({
    width: 300, //changes
    height: 200, //constant size
    scale: 1, //changes
  });

  useEffect(() => {
    const handleResize = () => {
      const width = canvasRef!.current!.clientWidth;
      const height = canvasRef!.current!.clientHeight;
      const scale = Math.min(width / frameWidth, height / frameHeight) * 0.8;
      setCanvasSize((prev) => ({
        ...prev,
        width: width,
        scale,
      }));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [frameHeight, frameWidth]);

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

  // function getFramePosition(
  //   planterWidth: number,
  //   planterHeight: number,
  //   stageWidth: number,
  //   stageHeight: number
  // ) {
  //   const x = stageWidth / 2 - planterWidth / 2;
  //   const y = 0;
  //   return { x, y };
  // }

  // const framePosition = getFramePosition(
  //   frameWidth,
  //   frameHeight,
  //   canvasSize.width,
  //   canvasSize.height
  // );

  return (
    <>
      <div className="h-full w-full fill-primary stroke-accent" ref={canvasRef}>
        {/* <p>
          Canvas height: {canvasSize.height} width: {canvasSize.width} scale:{" "}
          {canvasSize.scale}{" "}
        </p>
        <p>
          Frame height: {frameHeight} width: {frameWidth}
        </p> */}

        <Stage
          width={canvasSize.width}
          height={canvasSize.height}
          scaleX={canvasSize.scale}
          scaleY={canvasSize.scale}
        >
          <Layer>
            <PlanterFrame
              height={frameHeight}
              width={frameWidth}
              frameSize={frameSize}
              fillColor={fillColor}
              frameColor={frameColor}
            />
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default PlanterPreview;
