import { useEffect, useRef, useState } from "react";

function Canvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasDimention, setCanvasDimention] = useState({
    width: containerRef.current?.clientWidth || 500,
    height: containerRef.current?.clientHeight || 500,
  });

  const limitingDimension = Math.min(
    canvasDimention.width,
    canvasDimention.height
  );

  const planterDimentions = { width: 100, length: 100 };
  const planterTopLeft = {
    x: canvasDimention.width / 2 - planterDimentions.width / 2,
    y: 50,
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    //clear canvas
    ctx.save();
    ctx.clearRect(0, 0, canvasDimention.width, canvasDimention.height);

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "green";
    // ctx.rect(0, 0, canvasDimention.width, canvasDimention.height);
    ctx.rect(30, 30, 50, 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "brown";
    drawPlanter({ ctx, width: 100, length: 100 });
    ctx.stroke();
  };

  const drawPlanter = ({
    ctx,
    width,
    length,
  }: {
    ctx: CanvasRenderingContext2D | Path2D;
    width: number;
    length: number;
  }) => {
    ctx.rect(canvasDimention.width / 2 - width / 2, 50, width, length);
  };

  //Resize the canvas on window resize
  useEffect(() => {
    const handleResize = () => {
      setCanvasDimention({
        width: containerRef.current?.clientWidth || 500,
        height: containerRef.current?.clientHeight || 500,
      });
    };
    console.log(canvasDimention);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //Redraw the canvas on data change
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context) {
      draw(context);
    }
  }, [canvasDimention]);

  return (
    <div
      className="h-full w-full fill-white stroke-gray-700 bg-red-200 border-gray-500"
      ref={containerRef}
    >
      <canvas
        ref={canvasRef}
        width={canvasDimention.width}
        height={canvasDimention.height}
      />
    </div>
  );
}

export default Canvas;
