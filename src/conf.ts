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
            alignment?: string,
            sortable?: boolean,
            type: "integer"|"float"|"string"|"date",
            computeValue?: (dataSource: any) => any,
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
                    length: 20
                },
                {
                    headerType: "simple",
                    property: "newPrice",
                    label: "New Price",
                    type: "integer",
                    length: 20
                },
                {
                    headerType: "simple",
                    property: "oldPrice",
                    label: "Old Price",
                    type: "integer",
                    length: 20
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
                    computeValue(item: any){
                        return item.newPrice/item.oldPrice;
                    },
                    formatter(value){
                        return `${(value*100).toFixed(2)}%`;
                    }

                }
            ],
            panel: {
                rowCount: 3,
                columnCount: 3,
                panelItems: [
                    {
                        label: "Record Count",
                        getValue: (x : any[]) => x.length,
                    },
                    {
                        label: "Rune Record Count",
                        getValue: utils.countNameFx("Rune"),
                    },
                    {
                        label: "Rune Record Count",
                        getValue: utils.countNameFx("Rune"),
                    },
                    {
                        label: "Parch Record Count",
                        getValue: utils.countNameFx("Parchemin"),
                    },
                    {
                        label: "Galet Record Count",
                        getValue: utils.countNameFx("Parchemin"),
                    }
                ]
            }
        }
    ]

}

module.exports = conf;