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
    config : IConfig
    constructor(config: IConfig) {
        this.config = config;
        this.build();
    }

    private build(){
        for(let i = 0; i < this.config.views.length; i++){
            this.views.push(new View(this.config.views[i]));
        }
        this.renderView(0)
    }

    public renderView (index: number){
        this.currentView = index;
        this.views[index].render();
    }

}