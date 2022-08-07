import * as Commander from 'commander';
import {Consul} from '../consul/Consul';
const fs = require("fs-extra")
const filterProgram = new Commander.Command() ;

export class ViewCommand{

    consul: Consul;
    program: Commander.Command;
    constructor(consul : Consul){
        this.program = new Commander.Command();
        this.consul = consul;
        this.initCommand()
    }
    public getCommand(){
        return this.program;
    }
    public initCommand(){
        let c = this.consul;
        this.program.name("view").description("View related commands");

        let saveCmd = new Commander.Command();
        saveCmd.name("saveData")
            .addArgument(new Commander.Argument("<fileName>", "Output file name"))
            .action(
            (filename) => {
                fs.writeJSONSync(`./out/${filename}`, c.currentView.filteredData);
            });
            this.program.addCommand(saveCmd);
    }

    public run(args: string[]){
        filterProgram.parse(args);
        this.consul.currentView.render();
    }
}