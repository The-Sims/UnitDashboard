import { Component } from '@angular/core';
import { WebsocketService} from './services/websocket.service';
import {ChatService} from './services/chat.service';
import {EncapsulatingMessage} from "../messages/EncapsulatingMessage";
import {MessageOrder} from "../messages/MessageOrder";
import {MessageConfirmOrder} from "../messages/MessageConfirmOrder";
import {Order} from "./models/Order";
import {HomeComponent} from "./home/home.component";
import {FormControl} from "@angular/forms";
import {MessageRegister} from "../messages/MessageRegister";
import {MessageSenderService} from "./services/message-sender.service";
import index from "@angular/cli/lib/cli";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[WebsocketService,ChatService]
})
export class AppComponent {

    orders:Order[]=[];


  constructor(private chat:ChatService,private router: Router) {
      chat.messages.subscribe(msg => {
          console.log(msg.getMessageType)
          console.log(msg.getMessageData)
          this.switchComponent(msg);
      });
      this.startTimer();
  }

    switchComponent(msg) {
        switch (msg.getMessageType) {
            case "public class communication.messages.unitmessages.MessageOrder":
                console.log("Me gotst an order");
                let message = new MessageOrder(JSON.parse(msg.getMessageData));
                this.addOrders(new Order(message.getOrderId, message.getOperatorId, message.getIncidentTitle, message.getLocation))
                //console.log(message.getIncidentTitle + ", " + message.getLocation + ", " + message.getOperatorId + ", " + message.getOrderId);
                break;
            default:
                console.log("rip");
                break;
        }
    }
    sendLogin(test:string)
    {
        let obj = new MessageRegister(test);
        console.log(test)
        this.chat.sendMsg(obj)
    }
    interval;
    startTimer() {
        this.interval = setInterval(() => {
            let newOrders:Order[]=[];
            if (this.orders!==null) {
                for (var i = 0, len = this.orders.length; i < len; i++) {
                    if (this.orders[i]!= null && !this.orders[i].timerend)
                        newOrders.push(this.orders[i]);
                    else if (this.orders[i] != null)
                        this.AutoDeclineOrder(this.orders[i]);
                }
            }
            this.orders = newOrders;
        },1000)
    }

    AcceptOrder(order:Order){
        this.router.navigate(['/order']);
        order.accepted = true;
        let obj = new MessageConfirmOrder(order.operaterId, order.orderId, "Accepted.", true);
        this.chat.sendMsg(obj)
    }
    DeclineOrder(order:Order,reason:string){
        let newOrder:Order[] = [];
        for (let i = 0; i<this.orders.length; i++){
            if (this.orders[i].orderId !== order.orderId)
                newOrder.push(this.orders[i])
        }
        this.orders = newOrder;
        let obj = new MessageConfirmOrder(order.operaterId, order.orderId,reason, false);
        this.chat.sendMsg(obj)

    }
    AutoDeclineOrder(order:Order){
        let obj = new MessageConfirmOrder(order.operaterId, order.orderId, "Me GoTsT nO TiMe.", false);
        this.chat.sendMsg(obj)
    }


    addOrders(order:Order) {
        console.log(order)
        this.orders.push(order);
    }



  }
