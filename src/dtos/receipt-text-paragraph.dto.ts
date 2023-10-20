import { ReceiptTextBox } from "./receipt-text-box.dto";

export class ReceiptTextParagraph {
    order: number;
    text: string = '';
    textBoxes: ReceiptTextBox[] = [];
}