import { getShapes } from "@/lib/api/rooms";
import { Tool } from "@/lib/types";

type Shape =
  | {
    type: "rect";
    width: number;
    height: number;
    y: number;
    x: number;
  }
  | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
  }
  | {
    type: "pencil";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  };

export class Game {
  private canvas: HTMLCanvasElement;
  private roomId: string;
  private socket: WebSocket;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[] = [];
  private clicked: boolean;
  private startX: number = 0;
  private startY: number = 0;
  private lineEndX: number = 0;
  private lineEndY: number = 0;
  private selectedTool: Tool = "circle";
  private backgroundColor: string;

  constructor(
    canvas: HTMLCanvasElement,
    roomId: string,
    socket: WebSocket,
    backgroundColor: string = "#000000",
  ) {
    this.canvas = canvas;
    this.roomId = roomId;
    this.socket = socket;
    this.ctx = canvas.getContext("2d")!;
    this.clicked = false;
    this.backgroundColor = backgroundColor;

    this.init();
    this.initHandlers();
    this.initMouseHandlers();
  }

  setTool(tool: Tool) {
    this.selectedTool = tool;
  }

  // Allow background change dynamically
  setBackground(color: string) {
    this.backgroundColor = color;
    this.redraw();
  }

  async init() {
    this.existingShapes = (await getShapes(this.roomId)) || [];
    this.redraw();
  }

  initHandlers() {
    this.socket.onmessage = (e) => {
      const parsedMessage = JSON.parse(e.data);
      if (parsedMessage.type === "shape") {
        const shape = parsedMessage.shape;
        this.existingShapes.push(shape);
        this.redraw();
      } else if (parsedMessage.type === "error") {
        console.log(parsedMessage.error);
        return;
      }
    };
  }

  private redraw() {
    // Clear
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Paint background
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw shapes
    this.existingShapes.forEach((shape) => {
      this.ctx.strokeStyle = "rgb(225,225,225)";
      this.ctx.lineWidth = 2;

      if (shape.type === "rect") {
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      }

      if (shape.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          Math.abs(shape.radius),
          0,
          Math.PI * 2,
        );
        this.ctx.stroke();
        this.ctx.closePath();
      }

      if (shape.type === "pencil") {
        this.ctx.beginPath();
        this.ctx.moveTo(shape.startX, shape.startY);
        this.ctx.lineTo(shape.endX, shape.endY);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    });
  }

  mouseDownHandler = (e: MouseEvent) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
  };

  mouseUpHandler = (e: MouseEvent) => {
    this.clicked = false;

    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;
    let shape: Shape | null = null;

    if (this.selectedTool === "rect") {
      shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        width,
        height,
      };
    }

    if (this.selectedTool === "circle") {
      const radius = Math.abs(Math.max(width, height) / 2);
      shape = {
        type: "circle",
        radius,
        centerX: this.startX + radius,
        centerY: this.startY + radius,
      };
    }

    if (this.selectedTool === "pencil") {
      shape = {
        type: "pencil",
        startX: this.startX,
        startY: this.startY,
        endX: this.lineEndX,
        endY: this.lineEndY,
      };
    }

    if (!shape) return;

    this.existingShapes.push(shape);
    this.redraw();

    this.socket.send(
      JSON.stringify({
        type: "shape",
        shape,
        roomId: this.roomId,
      }),
    );
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (!this.clicked) return;

    this.lineEndX = e.clientX;
    this.lineEndY = e.clientY;

    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;

    this.redraw();

    this.ctx.strokeStyle = "rgb(225,225,225)";
    this.ctx.lineWidth = 2;

    if (this.selectedTool === "rect") {
      this.ctx.strokeRect(this.startX, this.startY, width, height);
    }

    if (this.selectedTool === "circle") {
      const radius = Math.abs(Math.max(width, height) / 2);
      const centerX = this.startX + radius;
      const centerY = this.startY + radius;

      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.closePath();
    }

    if (this.selectedTool === "pencil") {
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(this.lineEndX, this.lineEndY);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  };

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }
}
