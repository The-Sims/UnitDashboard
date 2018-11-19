import { Component } from '@angular/core';
import { WebsocketService} from './services/websocket.service';
import {ChatService} from './services/chat.service';
import {EncapsulatingMessage} from "../messages/EncapsulatingMessage";
import {MessageOrder} from "../messages/MessageOrder";
import {MessageConfirmOrder} from "../messages/MessageConfirmOrder";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[WebsocketService,ChatService]
})
export class AppComponent {
  constructor(private chatService: ChatService){
    chatService.messages.subscribe(msg=>{
      console.log(msg.getMessageType)
      console.log(msg.getMessageData)
      this.switchComponent(msg);
    });
  }

  switchComponent(msg){
    switch(msg.getMessageType){
      case "public class communication.messages.unitmessages.MessageOrder":
        console.log("Me gotst an order");
        let message = new MessageOrder(JSON.parse(msg.getMessageData));
        console.log(message.getIncidentTitle + ", " + message.getLocation + ", " + message.getOperatorId + ", " + message.getOrderId);
        break;
      default:
        console.log("rip");
        break;
    }
  }
  sendMsg(msg: object){
    console.log('new msg from client to web')
    let message = new EncapsulatingMessage(null);
    let obj = new MessageConfirmOrder("-1", -1, "No, Not accepting you piece of shit", false);
    message.setMessageType = obj.constructor.name;
    message.setMessageData = JSON.stringify(obj);
    this.chatService.messages.next(message);
  }
  title = 'DienstFront-app';
}
