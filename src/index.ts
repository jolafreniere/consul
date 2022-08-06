//const winston = require('winston');

import {IConfig, Consul} from "./types/consul/Consul";
//import * as inquirer from 'inquirer';





async function main(){
    let conf : IConfig = require("./conf");
    let consul = new Consul(conf);
    return consul;

    // while(true){
    //     await inquirer.prompt([
    //         {
    //             type: "input",
    //             name: "command"
    //         }
    //     ]).then(answers => {
    //         if(answers.command){
    //             let command = answers.command.split(" ");
    //             if(command[0] == "filter"){
    //                 let property = command[1];
    //                 let value = command[2];
    //                 let filter = (item: any) => {
    //                     return item[property].toLowerCase() == value.toLowerCase();
    //                 }
    //                 view.render(filter);
    //             } else if(command[0] == "count"){
    //                 let countFx = (records)=>{
    //                     let count = 0;
    //                     for(let i = 0; i < records.length; i++){
    //                         if(records[i].name.toLowerCase().indexOf(command[1].toLowerCase()) != -1){
    //                             count++;
    //                         }
    //                     }
    //                     return count;
    //                 }
    //                 let panelItem = new PanelItem({displayName: command[1]+" Count", getValue: countFx, dataSource: items});
    //                 view.addPanelItem(panelItem);
    //             }
    //         }
    //         view.render();
    //     })
    // }
}

main();




//console.log(process.stdout.columns +" "+ process.stdout.rows)