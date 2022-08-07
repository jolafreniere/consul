import * as Commander from "commander";
const inquirer = require("inquirer");
import {FilterCommand} from "./cmds/Filter";
import {ViewCommand} from "./cmds/View";
import {Consul} from "./consul/Consul";

export class ConsulCommander {
    consul: Consul;
    baseProgram: Commander.Command;
    constructor(consul: Consul){
        this.consul = consul;
        this.baseProgram = new Commander.Command();
        this.baseProgram.addCommand(new FilterCommand(consul).getCommand());
        this.baseProgram.addCommand(new ViewCommand(consul).getCommand());
    }

    public async start(){
        while(true){
            this.consul.renderView()
            let answer = await inquirer.prompt([
                {
                    type: "cmd",
                    name: "cmd",
                    message: "?>",
                }]);
            let cmd = answer.cmd;
            let args = cmd.split(" ");
            try{
                this.run(args);
            } catch(e){
                //TODO
            }
        }
    }

    public run(args: string[]){
        this.baseProgram.parse(["x", "y", ...args]);
    }
}