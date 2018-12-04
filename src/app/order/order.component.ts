import {Component, Input, OnInit, Output} from '@angular/core';
import {ChatService} from "../services/chat.service";
import {TipService} from "../services/tip.service";
import {Router} from "@angular/router";
import {ActivatedRoute} from '@angular/router';
import {EventEmitter} from "@angular/core";
import {Order} from "../models/Order";
import {DataService} from "../services/data.service";
import {MessageOrder} from "../../messages/MessageOrder";
import {MessageConfirmOrder} from "../../messages/MessageConfirmOrder";
import {MessageConcludeOrder} from "../../messages/MessageConcludeOrder";
import {MessageTip} from "../../messages/MessageTip";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  public order:Order;

  constructor(private chat:ChatService,private tip:TipService,private router: Router,private  data:DataService) {
      this.chat.messages.subscribe(msg => {
          console.log(msg.getMessageType)
          console.log(msg.getMessageData)
          this.switchComponent(msg);
      });
  }

    switchComponent(msg) {
        switch (msg.getMessageType) {
            case "public class communication.messages.unitmessages.MessageOrder":
                console.log("Me gotst an order");
                let message = new MessageOrder(JSON.parse(msg.getMessageData));

                //console.log(message.getIncidentTitle + ", " + message.getLocation + ", " + message.getOperatorId + ", " + message.getOrderId);
                break;
            default:
                console.log("rip");
                break;
        }
    }

  giveUpdate(tip:string){
    let obj= new MessageTip(tip,this.order.orderLocation)
      this.tip.sendMsg(obj);
  }

  getUpdate(){

  }

  concludeOrder(conclusion:string){
    let obj = new MessageConcludeOrder(this.order.orderId,conclusion);
      this.chat.sendMsg(obj)
      this.router.navigate(['/Home']);

  }

  ngOnInit() {
  this.order=this.data.getORder()
  }

}
