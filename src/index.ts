import {IConfig, Consul} from "./types/consul/Consul";

async function main(){
    let conf : IConfig = require("./conf");
    let consul = new Consul(conf);
    return consul;
}

main();
