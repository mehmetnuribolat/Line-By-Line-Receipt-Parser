import { Vertex } from "./receipt-interface";

export interface ReceiptTextBox{
    text: string;
    leftUpperVertice: Vertex,
    leftBottomVertice: Vertex,
    rightUpperVertice: Vertex,
    rightBottomVertice: Vertex,
}