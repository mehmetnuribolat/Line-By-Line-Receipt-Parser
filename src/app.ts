import { ReceiptTextList } from './dtos/receipt-interface';
import { ReceiptTextBox } from './dtos/receipt-text-box.dto';
import * as responseData from './resources/response.json';
import SegmentationHelper from './helper/segmentation-helper';

class Main {
    public async start()
    {
        try 
        {
            let receiptTextList = responseData as Array<ReceiptTextList>;
            
            //Get Upper, Bottom Values of TextBoxes
            const textBoxList: Array<ReceiptTextBox> = SegmentationHelper.getTextBoxes(receiptTextList);
            //Do Work
            const orderedTextList = SegmentationHelper.segmentTextBoxes(textBoxList);
            console.log('*************************');
            //Print Results
            for(let x of orderedTextList) 
            {
                console.log(x.text);
            }
        }catch(err) 
        {
            console.log(err);
        }
        console.log('*************************');
        console.log('End of execution');
    }
}

new Main().start();
