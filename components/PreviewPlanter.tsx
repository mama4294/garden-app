"use client";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import PlanterFrame from "./PlanterFrame";

interface KeyboardEvent {
  key: string;
}

const PlanterPreview = ({
  width: inputWidth,
  height: inputHeight,
}: {
  width: number;
  height: number;
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  let frameSize = 12;
  if (inputHeight < 50 || inputWidth < 50)
    frameSize = Math.min(inputHeight, inputWidth) / 4;

  const [canvasSize, setCanvasSize] = useState({
    width: 300,
    height: 300,
    scale: 1,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = canvasRef!.current!.offsetWidth;
      const height = canvasRef!.current!.offsetHeight;
      const scale = Math.min(width / inputWidth, height / inputHeight) * 0.8;
      setCanvasSize({
        width,
        height,
        scale,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [inputHeight, inputWidth]);

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
          scaleX={canvasSize.scale}
          scaleY={canvasSize.scale}
        >
          <Layer>
            <PlanterFrame
              height={inputHeight}
              width={inputWidth}
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
