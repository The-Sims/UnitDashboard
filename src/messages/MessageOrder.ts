export class MessageOrder{
  constructor(obj) {
    for (var prop in obj) this[prop] = obj[prop];
  }
  private operatorId: string;
  private orderId: number;
  private incidentTitle: string;
  private location: string;


  get getOperatorId(): string {
    return this.operatorId;
  }

  get getOrderId(): number {
    return this.orderId;
  }

  get getIncidentTitle(): string {
    return this.incidentTitle;
  }

  get getLocation(): string {
    return this.location;
  }
}
