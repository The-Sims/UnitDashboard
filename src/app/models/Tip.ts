export class Tip {
    private _message:string
    private _accepted:boolean

    constructor(obj) {
        for (var prop in obj) this[prop] = obj[prop];
    }

    get message(): string {
        return this._message;
    }

    get accepted(): boolean {
        return this._accepted;
    }
}