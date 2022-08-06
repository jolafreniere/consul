import {PanelItem} from "./PanelItem"
const colors = require("colors")
interface IPanel {
    "panelItems": PanelItem[];
    "rowCount": number;
    "columnCount": number;
    "dataSource": any[];
}

export class Panel implements IPanel {
    "panelItems": PanelItem[];
    "rowCount": number;
    "columnCount": number;
    "dataSource": any[];
    constructor(args: IPanel) {
        this.panelItems = args.panelItems;
        this.rowCount = args.rowCount;
        this.columnCount = args.columnCount;
        this.dataSource = args.dataSource;
    }

    public addItem(item: PanelItem) {
        item.dataSource = this.dataSource
        this.panelItems.push(item);
    }

    public render(relevantData?: any[]){
        if(relevantData){
            for(let i = 0; i < this.panelItems.length; i++){
                this.panelItems[i].dataSource = relevantData;
            }
        }
        let itemMaxWidth:number = process.stdout.columns / this.columnCount;
        let row:string = "";
        for(let i = 1; i <= this.panelItems.length; i++){
            let panelItem = this.panelItems[i-1];
            let itemString = panelItem.getItemValue();
            row += `  ${colors.bold(panelItem.displayName)}: ${itemString}`.padEnd(itemMaxWidth -1);
            if(i % this.columnCount == 0 ) {
                console.log(row);
                row = "";
            } else {
                row += "|";
            }
        }
        if(row.length > 0) {
            console.log(row.substring(0, row.length -1))
        }
    }
}