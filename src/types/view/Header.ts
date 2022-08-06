const colors = require("colors");
const utils = require("../../utils/utils");
import {Align} from "./Constants"

export interface IHeader {
    "headerType": "simple"
    "property": string;
    "type"?: string;
    "label"?: string;
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
    headerType: "simple"
    index: number;
    label: string;
    type: string;
    length: number;
    property: string;
    sortable: boolean;
    alignment: Align = Align.Left;
    formatter: (value: any) => string;
    colorizer: (formattedValue: any, value: string) => string;

    constructor(header: IHeader) {
        this.index = null;
        this.property = header.property;
        this.alignment = header.alignment || Align.Left;
        this.type = header.type || "string";
        this.label = header.label || header.property;
        this.length = header.length || 30;
        this.sortable = header.sortable || false;
        this.formatter = header.formatter || this.getFormatter();
        this.colorizer = header.colorizer || defaultColorizer

        if( header.length < this.label.length){
            this.length = this.label.length;
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
            return (value: any) => utils.formatDate(new Date(value)); //TODO: handle parsing elsewhere
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
        return colors.bold(utils.addMargins(Align.Left, this.label, this.length));
    }
}

export interface IComputedHeader {
    "headerType": "computed",
    "label": string;
    "computeValue": (item: any) => any;
    "type"?: string;
    "length"?: number;
    "alignment"?: Align;
    "sortable"?: boolean;
    "formatter"?: (value: any) => string;
    "colorizer"?: (value: any, formattedValue : string) => string;
}

export class ComputedHeader implements IComputedHeader {
    headerType: "computed"
    index: number;
    label: string;
    type: string;
    length: number;
    sortable: boolean;
    alignment: Align = Align.Left;
    computeValue: (item: any) => any;
    formatter: (value: any) => string;
    colorizer: (value: any, formattedValue: string) => string;

    constructor(header: IComputedHeader) {
        this.index = null;


        this.alignment = header.alignment || Align.Left;
        this.type = header.type || "string";
        this.label = header.label
        this.length = header.length || 30;
        this.sortable = header.sortable || false;
        this.formatter = header.formatter || (value => value);
        this.colorizer = header.colorizer || (value => value);
        this.computeValue = header.computeValue;
        if( header.length < this.label.length){
            this.length = this.label.length;
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
        return colors.bold(utils.addMargins(Align.Left, this.label, this.length));
    }
}
