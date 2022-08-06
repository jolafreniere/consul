import {IConfig, Consul} from "./types/consul/consul";
import {ConsulCommander} from "./types/ConsulCommander";

async function main() {
    let conf : IConfig = require("./conf");
    let consul = new Consul(conf);
    let consulCommander = new ConsulCommander(consul);
    await consulCommander.start();
}
main();
