import {Align} from "../types/view/Constants";

module.exports.addMargins = function(alignment: Align, value : string | number , columnWidth):string{
    value = value.toString();
    if(alignment === Align.Left){
        return value.padEnd(columnWidth-1).padStart(columnWidth);
    } else if(alignment === Align.Right){
        return value.padStart(columnWidth-1).padEnd(columnWidth);
    } else if(alignment === Align.Center){
        return value.padStart(value.length + 1).padEnd(value.length + 2).padStart(columnWidth/2+1).padEnd(columnWidth);
    } else return value;
}