import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from "../models/Order";
import {MessageConfirmOrder} from "../../messages/MessageConfirmOrder";
import {Router} from "@angular/router";
import {ChatService} from "../services/chat.service";
import {MessageOrder} from "../../messages/MessageOrder";
import {DataService} from "../services/data.service";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
    orders: Order[] = [];

    constructor(private chat: ChatService, private router: Router, private data: DataService) {
        this.chat.messages.subscribe(msg => {
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
        this.router.navigate(['/Order', order]);
        order.accepted = true;
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
        let obj = new MessageConfirmOrder(order.operaterId, order.orderId, "Me GoTsT nO TiMe.", false);
        this.chat.sendMsg(obj)
    }


    addOrders(order: Order) {
        console.log(order)
        this.orders.push(order);
    }

    ngOnInit() {

    }

}
