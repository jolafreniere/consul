import * as Commander from 'commander';
import {Consul} from '../consul/Consul';
const filterProgram = new Commander.Command() ;

export class FilterCommand{

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
        this.program.name("filters").description("Filter commands");

        let addCmd = new Commander.Command();
        addCmd.name("add")
            .addArgument(new Commander.Argument("<property>", "Filter to apply"))
            .addArgument(new Commander.Argument("<value>", "Filter to apply"))
            .option("--lt")
            .option("--gt")
            .option("--eq")
            .option("--contains")
            .option("--abs")
            .action(
            (property, value, options) => {
                let filter;
                if(options.lt){
                    if(options.abs){
                        filter = (x: any)=>{
                            return Math.abs(x[property]) < Math.abs(value);
                        }
                    } else {
                        filter = (x: any)=>{
                            return x[property] < value;
                        }
                    }

                } else if (options.gt){
                    if(options.abs){
                        filter = (x: any)=>{
                            return Math.abs(x[property]) > Math.abs(value);
                        }
                    }  else {
                        filter = (x: any)=>{
                            return x[property] > value;
                        }
                    }
                }
                else if (options.eq){
                    filter = (x: any)=>{
                        return x[property].toString().toLowerCase() == value.toString().toLowerCase();
                    }
                }
                else if (options.contains){
                    filter = (x: any)=>{
                        return x[property].toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1;
                    }
                }
                c.currentView.addFilter(filter);
            });

            let resetCmd = new Commander.Command();
            resetCmd.name("reset")
                .action(
                () => {
                    c.currentView.resetFilters();
                }
            );
            this.program.addCommand(addCmd);
            this.program.addCommand(resetCmd);

    }

    public run(args: string[]){
        filterProgram.parse(args);
        this.consul.currentView.render();
    }
}