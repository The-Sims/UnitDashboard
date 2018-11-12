export  class MessageConcludeOrder {
    constructor(Orderid: number, Conslusion: string) {
        this.Orderid = Orderid;
        this.Conslusion = Conslusion;
    }
   private Orderid:number;
   private Conslusion:string;
}