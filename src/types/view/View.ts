import {Header} from "./Header"

interface IView {
    "viewName": string;
    "headers": Header[];
    "dataSource": any[];
}

export class View implements IView {
    viewName: string;
    headers: Header[];
    dataSource:  any[];
    consoleWidth: number;
    consoleHeight: number;

    constructor(args : IView) {
        this.viewName = args.viewName;
        this.headers = args.headers;
        this.dataSource = args.dataSource;
        this.consoleWidth = process.stdout.columns;
        this.consoleHeight = process.stdout.rows;
    }

    private renderHeaders() {
        let topRow = ""
        for(let i = 0; i < this.headers.length; i++) {
            topRow += this.headers[i].toString()+(i == this.headers.length -1 ? "": "\|");
        }
        console.log(topRow);
    }
    public addDataItem(item: any) {
        this.dataSource.push(item);
    }

    private renderRows(){
        let displayableRowAmount = this.consoleHeight -2 
        if(this.dataSource.length > displayableRowAmount) {
            for(let i = 0; i < displayableRowAmount; i++) {
                let itemIndex = this.dataSource.length - (displayableRowAmount - i)
                this.renderItem(this.dataSource[itemIndex])
            }
        } else {
            for(let i = 0; i < this.dataSource.length; i++) {
                this.renderItem(this.dataSource[i])
            }
        }

    }

    private renderItem(item: any) {
        let row = "";
        for(let i = 0; i < this.headers.length; i++) {
            let value =item[this.headers[i].property]
            let formattedValue : string = this.headers[i].format(value)

            row += formattedValue+(i == this.headers.length -1 ? "": "\|");
        }
        console.log(row);
    }

    public render() {
        process.stdout.write('\x1Bc');
        console.clear();
        this.consoleWidth = process.stdout.columns;
        this.consoleHeight = process.stdout.rows;
        this.renderHeaders()
        this.renderRows();
    }
}