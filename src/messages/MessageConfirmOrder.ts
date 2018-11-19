export class MessageConfirmOrder{
  operatorId: string;
  orderId: number;
  reason: string;
  accepted: boolean;

  get getOperatorId(): string {
    return this.operatorId;
  }

  get getOrderId(): number {
    return this.orderId;
  }

  get getReason(): string {
    return this.reason;
  }

  get getAccepted(): boolean {
    return this.accepted;
  }

  constructor(operatorId1: string, orderId1: number, reason1: string, accepted1: boolean) {
    this.operatorId = operatorId1;
    this.orderId = orderId1;
    this.reason = reason1;
    this.accepted = accepted1;
  }
}
