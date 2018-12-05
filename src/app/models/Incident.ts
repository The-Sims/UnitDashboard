import {Tip} from "./Tip";
import {Order} from "./Order";

export  class Incident {
    private incidentId:number;
    private location:string;
    private _tips: Tip[] = [];
    constructor(obj) {
        for (var prop in obj) this[prop] = obj[prop];
    }


    get tips(): Tip[] {
        let temp : Tip[] = [];
        for (let i = 0; i < this._tips.length; i++) {
           // if (this._tips[i].accepted)
                temp.push(this._tips[i])
            console.log("tip")
        }
        return temp;
    }
}