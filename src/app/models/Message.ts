export class Message {
    get messageType(): string {
        return this._messageType;
    }

    get objecy(): Object {
        return this._objecy;
    }
    constructor(messageType: string, objecy: Object) {
        this._messageType = messageType;
        this._objecy = objecy;
    }

    private _messageType: string
    private _objecy:Object

}