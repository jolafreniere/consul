import { Align } from "./types/view/Constants";
const colors = require("colors");
const utils = require("./utils/utils");

export interface IConfig {
    "views": {
        viewName: string,
        dataPath: string,
        headers: {
            headerType: "simple"|"computed",
            property?: string,
            label: string,
            length?: number,
            alignment?: Align,
            sortable?: boolean,
            type: "integer"|"float"|"string"|"date",
            computeValue?: (dataSource: any) => any,
            colorizer?: (alignedValue: string, value: any) => string,
            formatter?: (value: any) => string,
        }[],
        panel: {
            rowCount: number,
            columnCount: number,
            panelItems: {
                label: string,
                getValue: (datasource: any[]) => any,
            }[]
        }
    }[],
}

let conf : IConfig = {
    views: [
        {
            viewName: "Items",
            dataPath: "./data/data.json",
            headers: [
                {
                    headerType: "simple",
                    property: "date",
                    label: "Time",
                    type: "date",
                    length: 20
                },
                {
                    headerType: "simple",
                    property: "name",
                    label: "Item",
                    type: "string",
                    length: 30
                },
                {
                    headerType: "simple",
                    property: "qty",
                    label: "Lot Size",
                    type: "integer",
                    alignment: Align.Right,
                    length: 20
                },
                {
                    headerType: "simple",
                    property: "newPrice",
                    label: "New Price",
                    type: "integer",
                    alignment: Align.Right,
                    length: 20
                },
                {
                    headerType: "simple",
                    property: "oldPrice",
                    label: "Old Price",
                    type: "integer",
                    alignment: Align.Right,
                    length: 20
                },
                {
                    "headerType": "simple",
                    property: "absoluteChange",
                    label: "Abs. Change",
                    type: "integer",
                    length: 20,
                    alignment: Align.Right,
                    colorizer: (alignedValue: string, value: any) => {
                        if(value > 0) {
                            return colors.green(alignedValue.toString());
                        }
                        else if(value < 0) {
                            return colors.red(alignedValue.toString())
                        }
                        else {
                            return alignedValue.toString()
                        }
                    }
                },
                {
                    headerType: "simple",
                    property: "avg",
                    label: "Average",
                    type: "integer",
                    length: 20
                },
                {
                    headerType: "computed",
                    type: "float",
                    label: "% of Avg",
                    length: 20,
                    alignment: Align.Right,
                    computeValue(item: any){
                        return ((item.newPrice / item.qty)/ item.avg)
                    },
                    formatter(value){
                        return `${(value*100).toFixed(2)}%`;
                    },
                    colorizer(alignedValue, value){
                        let usedValue = value*100;
                        if(usedValue > 107.5){
                            return colors.bgBrightGreen.black(alignedValue);
                        } else if (usedValue > 102.5){
                            return colors.bgGreen.black(alignedValue);
                        }else if (usedValue < 92.5){
                            return colors.bgBrightRed.black(alignedValue);
                        } else if (usedValue < 97.5){
                            return colors.red(alignedValue)
                        } else return alignedValue;
                    }

                }
            ],
            panel: {
                rowCount: 3,
                columnCount: 3,
                panelItems: [
                    {
                        label: "Record Count",
                        getValue: utils.countAllFx(),
                    },
                    {
                        label: "Rune Record Count",
                        getValue: utils.countPropertyContainsStrFx("name", "Rune"),
                    },
                    {
                        label: "Parch Record Count",
                        getValue: utils.countPropertyContainsStrFx("name", "Parchemin"),
                    },
                    {
                        label: "Galet Record Count",
                        getValue: utils.countPropertyContainsStrFx("name", "Galet"),
                    }
                ]
            }
        }
    ]

}

module.exports = conf;