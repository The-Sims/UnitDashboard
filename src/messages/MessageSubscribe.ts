export class MessageSubscribe {
    private orderId:number
    private subscribe=true;

    constructor(orderId: number) {
        this.orderId = orderId;
    }
}