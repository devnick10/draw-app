import { Tool } from "@/lib/types";
import { getExistingShapes } from "./http";
import { MouseEventHandler } from "react";

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
    } | {
        type: "pencil";
        startX: number;
        startY: number;
        endX: number;
        endY: number;
    }

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

    constructor(
        canvas: HTMLCanvasElement,
        roomId: string,
        socket: WebSocket
    ) {
        this.canvas = canvas;
        this.roomId = roomId;
        this.socket = socket;
        this.ctx = canvas.getContext("2d")!;
        this.clicked = false;
        this.init()
        this.initHandlers()
        this.initMouseHandlers()
    }

    setTool(tool: Tool) {
        this.selectedTool = tool;
    }

    async init() {
        this.existingShapes = await getExistingShapes(this.roomId) || [];
        this.clearCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (e) => {
            const message = JSON.parse(e.data);
            if (message.type === "chat") {
                const parsedShape = JSON.parse(message.message);
                this.existingShapes.push(parsedShape);
                this.clearCanvas();
            }
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgb(0,0,0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.existingShapes.map((shape) => {
            if (shape.type === "rect") {
                this.ctx.strokeStyle = "rgb(225,225,225)";
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if (shape.type === "pencil") {
                this.ctx.beginPath();
                this.ctx.moveTo(shape.startX, shape.startY);
                this.ctx.lineTo(shape.endX, shape.endY);
                this.ctx.stroke()
            }
        });
    }

    mouseDownHandler = (e: MouseEvent) => {
        this.clicked = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
    }

    mouseUpHandler = (e: MouseEvent) => {
        this.clicked = false;
        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;
        const selectedTool = this.selectedTool;
        let shape: Shape | null = null;

        if (selectedTool === "rect") {
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                width,
                height
            }
        } else if (selectedTool === "circle") {
            const radius = Math.abs(Math.max(width, height));
            shape = {
                type: "circle",
                radius,
                centerX: this.startX + radius,
                centerY: this.startY + radius
            }
        } else if (selectedTool === "pencil") {
            shape = {
                type: "pencil",
                startX: this.startX,
                startY: this.startY,
                endX: this.lineEndX,
                endY: this.lineEndY
            }
        }

        if (!shape) return;
        this.existingShapes.push(shape);
        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify(shape),
            roomId: this.roomId
        }))
    }
    mouseMoveHandler = (e: MouseEvent) => {
        if (this.clicked) {
            this.lineEndX = e.clientX;
            this.lineEndY = e.clientY;
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;

            this.clearCanvas();
            this.ctx.strokeStyle = "rgb(225,225,225)";
            const selectedTool = this.selectedTool;
            if (selectedTool === "rect") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);
            } else if (selectedTool === "circle") {
                const radius = Math.abs(Math.max(width, height) / 2);
                const centerX = this.startX + radius;
                const centerY = this.startY + radius;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if (selectedTool === "pencil") {
                this.ctx.beginPath();
                this.ctx.moveTo(this.startX, this.startY);
                this.ctx.lineTo(this.lineEndX, this.lineEndY);
                this.ctx.stroke()
            }
        }
    }

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