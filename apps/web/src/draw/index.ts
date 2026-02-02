type Shape =
  | {
      type: "react";
      width: number;
      height: number;
      y: number;
      x: number;
    }
  | {
      type: "circle";
      centerX: number;
      cneterY: number;
      radius: number;
    };

export function initDraw(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  const existingShapes: Shape[] = [];

  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";

  let clicked = false;
  let startX = 0;
  let startY = 0;
  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });
  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    existingShapes.push({
      type: "react",
      x: startX,
      y: startY,
      width,
      height,
    });
  });
  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearCanvas(existingShapes, canvas, ctx);
      ctx.strokeRect(startX, startY, width, height);
      ctx.strokeStyle = "rgb(225,225,225)";
    }
  });
}

function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  existingShapes.map((shape) => {
    if (shape.type === "react") {
      ctx.strokeStyle = "rgb(225,225,225)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}
