import {Header, ComputedHeader} from "./Header"
import {Panel} from "./Panel"
import {PanelItem} from "./PanelItem"
interface IView {
    "viewName": string;
    "panelItems"?: PanelItem[];
    "headers": (Header|ComputedHeader)[];
    "dataSource": any[];
}

export class View implements IView {
    viewName: string;
    headers: (Header|ComputedHeader)[];
    dataSource:  any[];
    relevantData: any[];
    consoleWidth: number;
    consoleHeight: number;
    panelHeight: number;
    panel = null;
    constructor(args : IView) {
        this.viewName = args.viewName;
        this.headers = args.headers;
        this.dataSource = args.dataSource;

        if(args.panelItems) {
            this.panel = new Panel({"columnCount": 5, "rowCount": 3, "panelItems": args.panelItems, "dataSource": args.dataSource});
        }
        this.relevantData = args.dataSource;
        this.panelHeight = this.panel ? this.panel.rowCount + 1 : 0;
        this.consoleWidth = process.stdout.columns;
        this.consoleHeight = process.stdout.rows;
    }

    public addPanelItem(item: PanelItem) {
        if(this.panel) {
            this.panel.addItem(item);
        }
    }

    private renderHeaders() {
        let topRow = ""
        for(let i = 0; i < this.headers.length; i++) {
            topRow += this.headers[i].toString()+(i == this.headers.length -1 ? "": "\|");
        }
        console.log(topRow);
        let bar = ""
        for(let i = 0; i < this.consoleWidth; i++) {
            bar += "-"
        }
        console.log(bar)
    }
    public addDataItem(item: any) {
        this.dataSource.push(item);
    }

    private renderPanel(relevantData?: any[]){
        if(this.panel) {
            this.panel.render(relevantData);
        }
        console.log()
    }

    private updateRelevantData(filter){
        this.relevantData = [];
        if(filter){
            for(let i = 0; i < this.dataSource.length; i++) {
                if(filter(this.dataSource[i])) this.relevantData.push(this.dataSource[i]);
            }
        } else {
            this.relevantData = this.dataSource
        }
    }

    private renderRows(filter?: (item: any) => boolean) {
        let displayableRowAmount = this.consoleHeight -(4 + this.panelHeight);
        
        if(this.relevantData.length > displayableRowAmount) {
            for(let i = 0; i < displayableRowAmount; i++) {
                let itemIndex = this.relevantData.length - (displayableRowAmount - i)
                this.renderItem(this.relevantData[itemIndex])
            }
        } else {
            for(let i = 0; i < this.relevantData.length; i++) {
                this.renderItem(this.relevantData[i])
            }
        }

    }

    private renderItem(item: any) {
        let row = "";
        for(let i = 0; i < this.headers.length; i++) {
            let value =this.headers[i].getValue(item);
            if(value == null) value = "Null";
            let formattedValue : string = this.headers[i].format(value)

            row += formattedValue+(i == this.headers.length -1 ? "": "\|");
        }
        console.log(row);
    }

    public render(filter?: (item: any) => boolean) {
        process.stdout.write('\x1Bc');
        console.clear();
        this.consoleWidth = process.stdout.columns;
        this.consoleHeight = process.stdout.rows;
        this.updateRelevantData(filter);
        console.log("\["+this.viewName+"\]");
        this.renderPanel(this.relevantData);
        this.renderHeaders();
        this.renderRows(filter);
    }
}