import {Component, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {WebsocketService} from './websocket.service';
import 'rxjs/add/operator/map'
import {Message} from '../models/Message';
import {EncapsulatingMessage} from "../../messages/EncapsulatingMessage";
import {MessageOrder} from "../../messages/MessageOrder";
import {Order} from "../models/Order";
import {HomeComponent} from "../home/home.component";
import {AppComponent} from "../app.component";
import {WebsocketTipService} from "./websocket-tip.service";
import {MessageConnectAsOperator} from "../../messages/MessageConnectAsOperator";


const CHAT_URL = 'ws:/145.93.112.219:8095/unitmanagerserver/websocket/';


@Injectable()
export class OrderService {
    public messages: Subject<EncapsulatingMessage>;
    public connectAsOperator;

    constructor(private ws: WebsocketTipService) {
        const $this = this;

        this.connectAsOperator = function () {
            console.log('setting callback');
            let obj = new MessageConnectAsOperator();
            $this.sendMsg(obj);
        };
        console.log("new chat service")
        this.messages = new Subject<EncapsulatingMessage>();
        this.messages = <Subject<EncapsulatingMessage>>this.ws
            .connect(CHAT_URL)
            .map((response: MessageEvent): EncapsulatingMessage => {
                let msg = new EncapsulatingMessage(JSON.parse(response.data));
                return msg;
            });
        setInterval(function () {
            console.log('ping order');
            let obj = new MessageConnectAsOperator();
            $this.sendMsg(obj);
        }, 10000);

    }


    sendMsg(msg: object) {
        let message = new EncapsulatingMessage(null);
        message.setMessageType = msg.constructor.name;
        message.setMessageData = JSON.stringify(msg);
        this.messages.next(message);
    }


}


export class Orderparent {
    private order: Order[];
}
