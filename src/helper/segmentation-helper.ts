import { ReceiptTextList } from "../dtos/receipt-interface";
import { ReceiptTextBox } from "../dtos/receipt-text-box.dto";
import { ReceiptTextParagraph } from "../dtos/receipt-text-paragraph.dto";

export default class SegmentationHelper {
    static  getTextBoxes(textList: Array<ReceiptTextList>) : Array<ReceiptTextBox> 
    {
        let textBoxList: Array<ReceiptTextBox>= [];
        const noOfItems:number = Object.keys(textList).length;

        for(let i=0 ; i < noOfItems -1 ; i++) 
        {
            //TODO CHECK FIRST DATA ON response.json
            //Skip the first item on response.json file
            if(i==0) 
            {
                continue;
            } 
            //Find the LeftMost, RightMost, TopMost, BottomMost  values of each text box
            try 
            {
                const vertices = textList[i].boundingPoly.vertices;
                const leftMost = vertices.reduce((min, vertex) => vertex.x < min.x ? vertex : min, vertices[0]);
                const rightMost = vertices.reduce((max, vertex) => vertex.x > max.x ? vertex : max, vertices[0]);
                const topMost = vertices.reduce((min, vertex) => vertex.y < min.y ? vertex : min, vertices[0]);
                const bottomMost = vertices.reduce((max, vertex) => vertex.y > max.y ? vertex : max, vertices[0]);
    
                // Create object with LeftUpper, LeftBottom, RightUpper, and RightBottom properties
                const result = {
                    LeftUpper: { x: leftMost.x, y: topMost.y },
                    LeftBottom: { x: leftMost.x, y: bottomMost.y },
                    RightUpper: { x: rightMost.x, y: topMost.y },
                    RightBottom: { x: rightMost.x, y: bottomMost.y }
                };
    
                const item: ReceiptTextBox =  {
                    text:   textList[i].description,
                    leftUpperVertice: result.LeftUpper,
                    leftBottomVertice: result.LeftBottom,
                    rightUpperVertice: result.RightUpper,
                    rightBottomVertice: result.RightBottom,
                };
    
                textBoxList.push(item);
            }
            catch(err) 
            {
                console.log(`Undefined Vertices array at index ${i}`);
            }
            
        }
        return textBoxList;
    }

    static segmentTextBoxes(textBoxList: Array<ReceiptTextBox>) 
    {
        textBoxList = textBoxList.sort((a,b) => a.leftBottomVertice.y - b.leftBottomVertice.y);

        const noOfItems:number = Object.keys(textBoxList).length -1;

        let paragraphList: Array<ReceiptTextParagraph> = [];

        let i = 0; //texBoxList index Number
        let y = 0; //paragraphList indexNumber
        do {
            //Find Last Paragraph On Array
            let lastParag = paragraphList[y];
            
            if(lastParag === undefined)
            {
                const newParagraph : ReceiptTextParagraph = new ReceiptTextParagraph();
                newParagraph.textBoxes.push(textBoxList[i]);
                paragraphList.push(newParagraph);
                i++;
            }
            else 
            {
                const lastTextBox = lastParag.textBoxes[lastParag.textBoxes.length -1];

                //Check if New Paragraph Started
                if(textBoxList[i].leftBottomVertice.y - lastTextBox.leftBottomVertice.y > 15 ) 
                {
                    // Join Text On Last Paragraph
                    lastParag.textBoxes = lastParag.textBoxes.sort((a,b) => a.leftBottomVertice.x - b.leftBottomVertice.x);
                    let line: string = lastParag.textBoxes.map(x => x.text).join(" ");
                    lastParag.text = line;
                    console.log("Sorted and Joined Line:", line);

                    const newParagraph : ReceiptTextParagraph = new ReceiptTextParagraph();
                    newParagraph.textBoxes.push(textBoxList[i]);
                    paragraphList.push(newParagraph);
                    y++;
                }
                else {
                    // Add Item to last Paragraph
                    lastParag.textBoxes.push(textBoxList[i]);
                }
                i++;
            }
            if(i>noOfItems) 
            {
                lastParag.textBoxes = lastParag.textBoxes.sort((a,b) => a.leftBottomVertice.x - b.leftBottomVertice.x);
                let line: string = lastParag.textBoxes.map(x => x.text).join(" ");
                lastParag.text = line;
                console.log("Sorted and Joined Line:", line);
                break;
            }
        }while(true);

        return paragraphList;
    }
}