export class EncapsulatingMessage{
  get getMessageType(): string {
    return this.messageType;
  }

  get getMessageData(): string {
    return this.messageData;
  }
  private messageType: string;

  private messageData: string;

  constructor(obj) {
    for (var prop in obj) this[prop] = obj[prop];
  }

  set setMessageType(value: string) {
    this.messageType = value;
  }

  set setMessageData(value: string) {
    this.messageData = value;
  }
}
