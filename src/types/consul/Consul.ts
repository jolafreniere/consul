import {IView, View} from "../view/View";
export interface IConfig {
    "views": IView[];
}

export class Config implements IConfig{
    views: IView[];
    constructor(args: IConfig) {
        this.views = args.views;
    }
}

export class Consul {
    views: View[] = [];
    currentView: View;
    config : IConfig
    constructor(config: IConfig) {
        this.config = config;
        this.build();
    }

    private build(){
        for(let i = 0; i < this.config.views.length; i++){
            this.views.push(new View(this.config.views[i]));
        }
    }

    public renderView (index?: number){
        if(index) {
            this.currentView = this.views[index];
        }
        else {
            this.currentView = this.views[0];
        }
        this.currentView.render();
    }
}