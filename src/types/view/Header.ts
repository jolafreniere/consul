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
    "colorizer"?: (formattedValue: any, value : string) => string;
}

function defaultColorizer(formattedValue: any, value: string): string {
    if(value == "Null") return colors.dim(formattedValue);
    return formattedValue;
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
    colorizer: (formattedValue: any, value: string) => string;

    constructor(header: IHeader) {
        this.index = header.index;
        this.property = header.property;

        this.alignment = header.alignment || Align.Left;
        this.type = header.type || "string";
        this.displayName = header.displayName || header.property;
        this.length = header.length || 30;
        this.sortable = header.sortable || false;
        this.formatter = header.formatter || this.getFormatter();
        this.colorizer = header.colorizer || defaultColorizer

        if( header.length < this.displayName.length){
            this.length = this.displayName.length;
        }
    }

    getFormatter(){
        if(this.type == "string"){
            return (value: any) => value;
        }
        if(this.type == "float"){
            return (value: any) => value.toFixed(2);
        }
        if(this.type == "integer"){
            return (value: any) => value;
        }
        if(this.type == "date"){
            return (value: any) => utils.formatDate(value);
        }
        return (value: any) => value;
    }

    isLastHeader(): boolean {
        return false;
    }



    public format(value: any): string {
        let formattedValue = this.formatter(value);
        if(formattedValue.length > this.length - 2){
            formattedValue = formattedValue.substring(0, this.length -5) + "...";
        }
        let alignedValue = utils.addMargins(this.alignment, formattedValue, this.length);
        return this.colorizer(alignedValue, value);
    }
    public getValue(value: any){
        return value[this.property];
    }

    public toString(){
        return colors.bold(utils.addMargins(Align.Left, this.displayName, this.length));
    }
}

interface IComputedHeader {
    "index": number;
    "displayName": string;
    "computeValue": (item: any) => any;
    "type"?: string;
    "length"?: number;
    "alignment"?: Align;
    "sortable"?: boolean;
    "formatter"?: (value: any) => string;
    "colorizer"?: (value: any, formattedValue : string) => string;
}

export class ComputedHeader implements IComputedHeader {
    index: number;
    displayName: string;
    type: string;
    length: number;
    sortable: boolean;
    alignment: Align = Align.Left;
    computeValue: (item: any) => any;
    formatter: (value: any) => string;
    colorizer: (value: any, formattedValue: string) => string;

    constructor(header: IComputedHeader) {
        this.index = header.index;


        this.alignment = header.alignment || Align.Left;
        this.type = header.type || "string";
        this.displayName = header.displayName
        this.length = header.length || 30;
        this.sortable = header.sortable || false;
        this.formatter = header.formatter || (value => value);
        this.colorizer = header.colorizer || (value => value);
        this.computeValue = header.computeValue;
        if( header.length < this.displayName.length){
            this.length = this.displayName.length;
        }
    }

    isLastHeader(): boolean {
        return false;
    }

    public getValue(item: any): any {
        return this.computeValue(item);
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
