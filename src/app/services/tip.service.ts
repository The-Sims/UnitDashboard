import { Injectable } from '@angular/core';
import {EncapsulatingMessage} from "../../messages/EncapsulatingMessage";
import {Subject} from "rxjs";
import {WebsocketService} from "./websocket.service";


const CHAT_URL = 'ws:/localhost:8100/unitmanagerserver/websocket/';
@Injectable()
export class TipService {
    public  tips: Subject<EncapsulatingMessage>;
  constructor(private ws:WebsocketService) {

      console.log("new chat service")
      this.tips = new Subject<EncapsulatingMessage>();
      this.tips = <Subject<EncapsulatingMessage>>this.ws
          .connect(CHAT_URL)
          .map((response: MessageEvent): EncapsulatingMessage => {
              console.log(response.data)
              console.log("help")
              let msg = new EncapsulatingMessage(JSON.parse(response.data));
              return msg;
          });
  }


    sendMsg(msg: object) {
        console.log('new msg from client to web')
        let message = new EncapsulatingMessage(null);
        message.setMessageType = msg.constructor.name;
        message.setMessageData = JSON.stringify(msg);
        this.tips.next(message);
    }
}
