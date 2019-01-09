import {Component, Input, OnInit, Output} from '@angular/core';
import {OrderService} from "../services/order.service";
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
import {MessageUpdateIncident} from "../../messages/MessageUpdateIncident";
import {Tip} from "../models/Tip";
import {Incident} from "../models/Incident";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

    public order: Order;
    tips: Tip[] = []

    constructor(private chat: OrderService, private tip: TipService, private router: Router, private  data: DataService) {
        this.tip.tips.subscribe(msg => {
            this.switchComponent(msg);
        });
    }

    switchComponent(msg) {
        switch (msg.getMessageType) {

            case"public class communication.messages.sharedmessages.MessageUpdateIncident":
                let messagetip = new MessageUpdateIncident(JSON.parse(msg.getMessageData));
                this.getUpdate(messagetip.incident)
                //this.tips= messagetip.incident.tips
                break;
            case 'public class communication.messages.operatormessages.MessageConnectAsOperator':
                console.log('pong tip');
                break;
            default:
                console.log("RIP");
                console.log(msg.getMessageType);
                break;
        }
    }

    giveUpdate(input: HTMLInputElement) {
        let obj = new MessageTip(input.value, this.order.orderLocation)
        this.tip.sendMsg(obj);
        input.value = ''
    }


    concludeOrder(input: HTMLInputElement) {
        let obj = new MessageConcludeOrder(this.order.orderId, input.value);
        this.chat.sendMsg(obj)
        this.router.navigate(['/Home']);
        input.value = ''

    }

    getUpdate(incident: Incident) {
        this.tips = []
        this.tips = incident.tips
    }

    ngOnInit() {
        this.order = this.data.getOrder()

        if (this.data.getId()==null) {
            this.router.navigate(['/Login']);
        }
        else {
            console.log(this.data.getId())
        }
    }

}
