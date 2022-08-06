import {Header, ComputedHeader, IHeader, IComputedHeader} from "./Header"
import {Panel, IPanel} from "./Panel"
import fs from "fs-extra";
import {PanelItem} from "./PanelItem"
export interface IView {
    "viewName": string;
    "dataPath": string;
    "panel": IPanel;
    "headers": (IHeader|IComputedHeader)[];
}

export class View implements IView {
    viewName: string;
    headers: (Header|ComputedHeader)[] = [];
    dataSource:  any[];
    dataPath: string;
    relevantData: any[];
    consoleWidth: number;
    consoleHeight: number;
    panelHeight: number;
    panel : IPanel;
    constructor(args : IView) {
        this.viewName = args.viewName;
        this.dataPath = args.dataPath;
        this.dataSource = fs.readJsonSync(args.dataPath);

        for(let i = 0; i < args.headers.length; i++){
            let header = args.headers[i];
            if(header.headerType == "computed") {
                    let compHeader : ComputedHeader = new ComputedHeader(header);
                    compHeader.index = i;
                    this.headers.push(compHeader);
            } else {
                    let simpHeader : Header = new Header(header);
                    simpHeader.index = i;
                    this.headers.push(new Header(simpHeader));
            }
        }

        this.panel = new Panel(args.panel);
        this.panelHeight = 7;
        this.relevantData = this.dataSource;
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
        this.panel.setDataSource(this.relevantData);
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