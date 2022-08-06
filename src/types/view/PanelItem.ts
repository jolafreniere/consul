export interface IPanelItem {
    "label": string;
    "getValue": (datasource: any[]) => any;
    "type"?: string;
}

export class PanelItem implements IPanelItem {
    "label": string;
    public "dataSource": any[];
    "getValue": (datasource: any[]) => any;
    constructor(args: IPanelItem) {
        this.getValue = args.getValue;
        this.label = args.label;
    }
    getItemValue(){
        return this.getValue(this.dataSource).toString();
    }
}