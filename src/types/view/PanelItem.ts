interface IPanelItem {
    "displayName": string;
    "getValue": (datasource: any[]) => any;
    "dataSource": any[];
    "type"?: string;
}

export class PanelItem implements IPanelItem {
    "displayName": string;
    "dataSource": any[];
    "getValue": (datasource: any[]) => any;
    constructor(args: IPanelItem) {
        this.getValue = args.getValue;
        this.dataSource = args.dataSource;
        this.displayName = args.displayName;
    }
    getItemValue(){
        return this.getValue(this.dataSource).toString();
    }
}