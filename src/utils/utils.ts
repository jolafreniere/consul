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

module.exports.formatDate = function (date){
    let hours = "0" + (date.getHours()).toString();
    let minutes =  "0"+(date.getMinutes()).toString();
    let seconds =  "0"+(date.getSeconds()).toString();
    let month = "0" + (date.getMonth() + 1);
    let day = "0" + date.getDate();
    return month.substr(-2)+"-"+day.substr(-2)+" "+hours.substr(-2)+":"+minutes.substr(-2)+":"+seconds.substr(-2);
}

module.exports.countNameFx = function(value: string, dataSource){
    return function(data: any[]){
        let count = 0;
        for(let i = 0; i < data.length; i++){
            if(data[i]["name"] === value){
                count++;
            }
        }
        return count;
    }
}