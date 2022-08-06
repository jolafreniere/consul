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
    consoleWidth: number;
    consoleHeight: number;
    panelHeight: number;
    private filters : ((item: any) => boolean)[] = [];
    defaultFilter: (item: any) => boolean;
    filteredData : any[];
    panel : IPanel;
    constructor(args : IView) {
        this.viewName = args.viewName;
        this.dataPath = args.dataPath;
        this.dataSource = fs.readJsonSync(args.dataPath);
        this.defaultFilter = (item: any) => true;
        this.filteredData = [];
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
        this.updateFilteredData()
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

    private updateFilteredData() {
        let filtered = this.dataSource.filter(this.defaultFilter);
        for(let i = 0; i < this.filters.length; i++){
            filtered = filtered.filter(this.filters[i]);
        }
        this.filteredData = filtered;
    }

    public resetFilters(){
        this.filters = [this.defaultFilter];
    }

    private renderRows() {
        let displayableRowAmount = this.consoleHeight -(4 + this.panelHeight);
        if(this.filteredData.length > displayableRowAmount) {
            for(let i = 0; i < displayableRowAmount; i++) {
                let itemIndex = this.filteredData.length - (displayableRowAmount - i)
                this.renderItem(this.filteredData[itemIndex])
            }
        } else {
            for(let i = 0; i < this.filteredData.length; i++) {
                this.renderItem(this.filteredData[i])
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

    public addFilter(filter: (item: any) => boolean) {
        this.filters.push(filter);
        this.updateFilteredData();
    }
    public render() {
        process.stdout.write('\x1Bc');
        console.clear();
        this.consoleWidth = process.stdout.columns;
        this.consoleHeight = process.stdout.rows;
        this.updateFilteredData();
        console.log("\["+this.viewName+"\]");
        this.renderPanel(this.filteredData);
        this.renderHeaders();
        this.renderRows();
    }
}