import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {WebsocketService} from './websocket.service';
import 'rxjs/add/operator/map'
import {Message} from '../models/Message';
import {EncapsulatingMessage} from "../../messages/EncapsulatingMessage";
import {MessageOrder} from "../../messages/MessageOrder";
import {Order} from "../models/Order";
import {HomeComponent} from "../home/home.component";


const CHAT_URL = 'ws:/145.93.113.127:8095/unitmanagerserver/websocket/';


@Injectable({
    providedIn: 'root'

})
export class ChatService {
    public messages: Subject<EncapsulatingMessage>;
    private ws :WebsocketService;
    private home:HomeComponent;

    constructor() {
        this.ws = new WebsocketService();
        this.home = new HomeComponent();
        this.messages.subscribe(msg => {
            console.log(msg.getMessageType)
            console.log(msg.getMessageData)
            this.switchComponent(msg);


            this.messages = <Subject<EncapsulatingMessage>>this.ws
                .connect(CHAT_URL)
                .map((response: MessageEvent): EncapsulatingMessage => {
                    console.log(response.data)
                    let msg = new EncapsulatingMessage(JSON.parse(response.data));
                    return msg;
                });

        })
    }

    switchComponent(msg) {
        switch (msg.getMessageType) {
            case "public class communication.messages.unitmessages.MessageOrder":
                console.log("Me gotst an order");
                let message = new MessageOrder(JSON.parse(msg.getMessageData));
                this.home.addOrders(new Order(message.getOrderId, message.getOperatorId, message.getIncidentTitle, message.getLocation))
                console.log(message.getIncidentTitle + ", " + message.getLocation + ", " + message.getOperatorId + ", " + message.getOrderId);
                break;
            default:
                console.log("rip");
                break;
        }
    }
}
export class Orderparent {
    private order: Order[];
}
