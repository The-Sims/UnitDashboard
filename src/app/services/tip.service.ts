import { Injectable } from '@angular/core';
import {EncapsulatingMessage} from "../../messages/EncapsulatingMessage";
import {Subject} from "rxjs";
import {WebsocketService} from "./websocket.service";
import {MessageConnectAsOperator} from "../../messages/MessageConnectAsOperator";


const CHAT_URL = 'ws:/145.93.112.226:8090/analyserserver/websocket/';
@Injectable()
export class TipService {
    public  tips: Subject<EncapsulatingMessage>;
    public connectAsOperator;
  constructor(private ws:WebsocketService) {
      const $this = this;
      this.connectAsOperator = function () {
          console.log('setting callback');
          let obj = new MessageConnectAsOperator();
          $this.sendMsg(obj);
      };
      console.log("new tip service")
      this.tips = new Subject<EncapsulatingMessage>();
      this.tips = <Subject<EncapsulatingMessage>>this.ws
          .connect(CHAT_URL)
          .map((response: MessageEvent): EncapsulatingMessage => {
              let msg = new EncapsulatingMessage(JSON.parse(response.data));
              return msg;
          });
      setInterval(function () {
          console.log('ping tip');
          let obj = new MessageConnectAsOperator();
          $this.sendMsg(obj);
      }, 10000);
  }


    sendMsg(msg: object) {
        let message = new EncapsulatingMessage(null);
        message.setMessageType = msg.constructor.name;
        message.setMessageData = JSON.stringify(msg);
        this.tips.next(message);
    }
}
