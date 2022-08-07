import {IConfig, Consul} from "./types/consul/consul";
import {ConsulCommander} from "./types/ConsulCommander";

const express = require("express")
const app = express();

let buffer = []
app.use(express.json());

let consul : Consul;

app.get("/", (req, res) => {
    debugger;
});
app.post("/", (req, res) => {
    let data = req.body.message;
    data.date = req.body.timestamp;
    buffer.push(data);
    if(buffer.length > 3) {
        consul.views[0].addDataItems(buffer);
        consul.renderView();
        buffer = [];
    }
    res.send("nice")
})
app.listen(3001, () => {
    console.log("listening on port 3001")
});


async function main() {
    let conf : IConfig = require("./conf");
    consul = new Consul(conf);
    let consulCommander = new ConsulCommander(consul);
    await consulCommander.start();
}
main();
