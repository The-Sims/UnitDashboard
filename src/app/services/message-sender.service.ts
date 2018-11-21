import { Injectable } from '@angular/core';
import {EncapsulatingMessage} from "../../messages/EncapsulatingMessage";
import {ChatService} from "./chat.service";

@Injectable({
  providedIn: 'root'
})
export class MessageSenderService {
  private chat :ChatService;
  constructor() {
      //this.chat = new ChatService()
  }
    // sendMsg(msg: object) {
    //     console.log('new msg from client to web')
    //     let message = new EncapsulatingMessage(null);
    //     message.setMessageType = msg.constructor.name;
    //     message.setMessageData = JSON.stringify(msg);
    //     this.chat.messages.next(message);
    // }

}
