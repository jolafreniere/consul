import {PanelItem, IPanelItem} from "./PanelItem"
const colors = require("colors")
export interface IPanel {
    panelItems: IPanelItem[];
    rowCount: number;
    columnCount: number;
    setDataSource(dataSource: any[]): void;
    render: (relevantData?:any[])=>void;
    addItem: (item: IPanelItem)=>void;
}

export class Panel implements IPanel {
    "panelItems": PanelItem[] = [];
    "rowCount": number;
    "columnCount": number;
    "dataSource": any[];
    constructor(args: IPanel) {
        this.rowCount = args.rowCount;
        this.columnCount = args.columnCount;
        for(let i = 0; i < args.panelItems.length; i++) {
            this.panelItems.push(new PanelItem(args.panelItems[i]));
        }
    }

    public setDataSource(datasource: any[]){
        this.dataSource = datasource;
        for(let i = 0; i < this.panelItems.length; i++) {
            this.panelItems[i].dataSource = datasource;
        }
    }

    public addItem(item: IPanelItem) {
        let panelItm = new PanelItem(item)
        panelItm.dataSource = this.dataSource
        this.panelItems.push(new PanelItem(item));
    }

    public render(relevantData?: any[]){

        for(let i = 0; i < this.panelItems.length; i++){
           this.panelItems[i].dataSource = relevantData;
        }
        let itemMaxWidth:number = process.stdout.columns / this.columnCount;
        let row:string = "";
        for(let i = 1; i <= this.panelItems.length; i++){
            let panelItem = this.panelItems[i-1];
            let itemString = panelItem.getItemValue();

            row += `  ${colors.bold(panelItem.label)}: ${itemString}`.padEnd(itemMaxWidth -1);
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