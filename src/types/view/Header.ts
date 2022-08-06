const colors = require("colors");
const utils = require("../../utils/utils");
import {Align} from "./Constants"

export interface IHeader {
    "index": number;
    "property": string;

    "type"?: string;
    "displayName"?: string;
    "length"?: number;
    "alignment"?: Align;
    "sortable"?: boolean;
    "formatter"?: (value: any) => string;
    "colorizer"?: (value: any, formattedValue : string) => string;
}

export class Header implements IHeader {
    index: number;
    displayName: string;
    type: string;
    length: number;
    property: string;
    sortable: boolean;
    alignment: Align = Align.Left;
    formatter: (value: any) => string;
    colorizer: (value: any, formattedValue: string) => string;

    constructor(header: IHeader) {
        this.index = header.index;
        this.property = header.property;

        this.alignment = header.alignment || Align.Left;
        this.type = header.type || "string";
        this.displayName = header.displayName || header.property;
        this.length = header.length || 30;
        this.sortable = header.sortable || false;
        this.formatter = header.formatter || (value => value);
        this.colorizer = header.colorizer || (value => value);

        if( header.length < this.displayName.length){
            this.length = this.displayName.length;
        }
    }

    isLastHeader(): boolean {
        return false;
    }

    public format(value: any): string {
        let formattedValue = this.formatter(value);
        let alignedValue = utils.addMargins(this.alignment, formattedValue, this.length);
        return this.colorizer(alignedValue, value);
    }

    public toString(){
        return colors.bold(utils.addMargins(Align.Left, this.displayName, this.length));
    }
}
