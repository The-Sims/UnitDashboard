import {HomeComponent} from "../home/home.component";

export  class  Order {
    get timerend(): boolean {
        if (!this._accepted){
            this._timer--;
            if (this._timer<0)
                return true;
        }
        return false;
    }
    private _timerend:boolean= false

    get orderId(): number {
        return this._orderId;
    }

    get operaterId(): string {
        return this._operaterId;
    }

    get orderTitle(): string {
        return this._orderTitle;
    }

    get orderLocation(): string {
        return this._orderLocation;
    }
    constructor(orderId: number, operaterId: string, orderTitle: string, orderLocation: string) {

        this._orderId = orderId;
        this._operaterId = operaterId;
        this._orderTitle = orderTitle;
        this._orderLocation = orderLocation;

    }
    private _orderId:number
    private _operaterId:string
    private _orderTitle:string
    private _orderLocation:string
    private _accepted:boolean
    private _timer:number=30


}