import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from "../models/Order";
import {MessageConfirmOrder} from "../../messages/MessageConfirmOrder";
import {Router} from "@angular/router";
import {OrderService} from "../services/order.service";
import {MessageOrder} from "../../messages/MessageOrder";
import {DataService} from "../services/data.service";
import {TipService} from "../services/tip.service";
import {MessageSubscribe} from "../../messages/MessageSubscribe";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
    orders: Order[] = [];

    constructor(private tip:TipService, private chat: OrderService, private router: Router, private data: DataService) {
        this.chat.messages.subscribe(msg => {
            this.switchComponent(msg);
        });
        this.startTimer();

    }

    switchComponent(msg) {
        switch (msg.getMessageType) {
            case "public class communication.messages.unitmessages.MessageOrder":
                let message = new MessageOrder(JSON.parse(msg.getMessageData));
                this.addOrders(new Order(message.getOrderId, message.getOperatorId, message.getIncidentTitle, message.getLocation))
                //console.log(message.getIncidentTitle + ", " + message.getLocation + ", " + message.getOperatorId + ", " + message.getOrderId);
                break;
            case 'public class communication.messages.operatormessages.MessageConnectAsOperator':
                console.log('pong order');
                break;
            default:
                console.log("rip"+msg.getMessageType);
                break;
        }
    }

    interval;

    startTimer() {
        this.interval = setInterval(() => {
            let newOrders: Order[] = [];
            if (this.orders !== null) {
                for (var i = 0, len = this.orders.length; i < len; i++) {
                    if (this.orders[i] != null && !this.orders[i].timerend)
                        newOrders.push(this.orders[i]);
                    else if (this.orders[i] != null)
                        this.AutoDeclineOrder(this.orders[i]);
                }
            }
            this.orders = newOrders;
        }, 1000)
    }

    AcceptOrder(order: Order) {
        this.data.changeOrder(order);
        this.router.navigate(['/Order']);
        order.accepted = true;
        let tipObj= new MessageSubscribe(order.orderId)
        this.tip.sendMsg(tipObj)
        let obj = new MessageConfirmOrder(order.operaterId, order.orderId, "Accepted.", true);
        this.chat.sendMsg(obj)
    }

    DeclineOrder(order: Order, reason: string) {
        let newOrder: Order[] = [];
        for (let i = 0; i < this.orders.length; i++) {
            if (this.orders[i].orderId !== order.orderId)
                newOrder.push(this.orders[i])
        }
        this.orders = newOrder;
        let obj = new MessageConfirmOrder(order.operaterId, order.orderId, reason, false);
        this.chat.sendMsg(obj)

    }

    AutoDeclineOrder(order: Order) {
        let obj = new MessageConfirmOrder(order.operaterId, order.orderId, "Niet beschikbaar.", false);
        this.chat.sendMsg(obj)
    }


    addOrders(order: Order) {
        this.orders.push(order);
    }

    ngOnInit() {
        if (this.data.getId()==null) {
            this.router.navigate(['/Login']);
        }
        else {
            console.log(this.data.getId())
        }


    }

}
