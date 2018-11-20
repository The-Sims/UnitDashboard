import { Component, OnInit } from '@angular/core';
import {Order} from "../models/Order";

import {AppComponent, Orderparent} from "../app.component";
import {MessageConfirmOrder} from "../../messages/MessageConfirmOrder";
import {forEach} from "@angular/router/src/utils/collection";
import {Router} from "@angular/router";
import {ChatService} from "../services/chat.service";
import {MessageSenderService} from "../services/message-sender.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    orders:Order[]=null;
    private  mgsSend : MessageSenderService;
    constructor() {
        this.startTimer()
        this.mgsSend= new MessageSenderService();
    }


    interval;
    startTimer() {
        this.interval = setInterval(() => {
            let newOrders:Order[]=null;
            for (var i = 0, len = this.orders.length; i < len; i++) {
                if (!this.orders[i].timerend)
                    newOrders.push(this.orders[i]);
                else
                    this.AutoDeclineOrder(this.orders[i]);
            }
            this.orders = newOrders;
        },1000)
    }

  AcceptOrder(order:Order){
        let obj = new MessageConfirmOrder(order.operaterId, order.orderId, "Accepted.", true);
        this.mgsSend.sendMsg(obj)
  }
  DeclineOrder(order:Order){
        let obj = new MessageConfirmOrder(order.operaterId, order.orderId, "No, Not accepting you piece of shit", false);
        this.mgsSend.sendMsg(obj)

  }
  AutoDeclineOrder(order:Order){
      let obj = new MessageConfirmOrder(order.operaterId, order.orderId, "No responds.", false);
      this.mgsSend.sendMsg(obj)
  }


     addOrders(order:Order) {
        this.orders.push(order);
    }

  ngOnInit() {
  }

}
