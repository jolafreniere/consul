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
    currentView: number = 0;
    constructor(config: IConfig) {
        for(let i = 0; i < config.views.length; i++){
            this.views.push(new View(config.views[i]));
        }
        this.renderView(0)
    }

    public renderView (index: number){
        this.currentView = index;
        this.views[index].render();
    }
}