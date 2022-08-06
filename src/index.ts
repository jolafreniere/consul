//const winston = require('winston');
import {View} from "./types/view/View";
import {Header} from "./types/view/Header";
import * as inquirer from 'inquirer';
const colors = require("colors");

let ItemDateHeader = new Header({
    property: "date",
    index: 0,
    displayName: "Time",
    type: "string",
    length: 15,
});

let ItemNameHeader = new Header({
    property: "itemName",
    index: 1,
    displayName: "Item",
    type: "string",
    length: 30,
});

let ItemLotHeader = new Header({
    property: "itemLot",
    index: 2,
    displayName: "Lot Size",
    type: "number",
    length: 10,
});

let ItemPriceHeader = new Header({
    property: "itemPrice",
    index: 3,
    displayName: "Price",
    type: "number",
    length: 20,
    colorizer: (value: any) => {
        if(value > 0) {
            return colors.green(value);
        } else  {
            return colors.red(value);
        }
    }
});

let headers = [
    ItemDateHeader,
    ItemNameHeader,
    ItemLotHeader,
    ItemPriceHeader
]
let items = [];
let i = 0;
for(; i < 60; i++) {
    let item = {
        date: "2018-01-01",
        itemName: "Item "+i,
        itemLot: 100,
        itemPrice: -40 +i
    }
    items.push(item);
}

let args = {
    viewName: "Items",
    headers: headers,
    dataSource: items
}
let view = new View(args);

async function main(){

    view.render();
    while(true){
        await inquirer.prompt([
            {
                type: "confirm",
                name: "continue",
                message: "Continue?"
            }
        ]).then(answers => {
            if(answers.continue) {
                for(let j = i; j < i + 10; j++){
                    view.addDataItem({
                        date: "2018-01-01",
                        itemName: "Item "+j,
                        itemLot: 100,
                        itemPrice: j
                    })
                }
                view.render();
            }
        })
    }
}

main();




//console.log(process.stdout.columns +" "+ process.stdout.rows)