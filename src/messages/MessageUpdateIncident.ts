import {Incident} from "../app/models/Incident";

export class MessageUpdateIncident {

    private _incident:Incident

    constructor(obj) {
        for (var prop in obj) this[prop] = obj[prop];
    }


    get incident(): Incident {
        return this._incident;
    }
}