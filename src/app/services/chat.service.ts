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


const CHAT_URL = 'ws:/145.93.113.9:8095/unitmanagerserver/websocket/';


@Injectable({
    providedIn: 'root'

})
export class ChatService {
    public messages: Subject<EncapsulatingMessage>;
    private ws :WebsocketService;
    //private home:HomeComponent;
    private  app:AppComponent;
    constructor() {
        this.messages = new Subject<EncapsulatingMessage>();
            this.ws = new WebsocketService();

            this.messages = <Subject<EncapsulatingMessage>>this.ws
                .connect(CHAT_URL)
                .map((response: MessageEvent): EncapsulatingMessage => {
                    console.log(response.data)
                    console.log("help")
                    let msg = new EncapsulatingMessage(JSON.parse(response.data));
                    return msg;
                });

        }


    sendMsg(msg: object) {
        console.log('new msg from client to web')
        let message = new EncapsulatingMessage(null);
        message.setMessageType = msg.constructor.name;
        message.setMessageData = JSON.stringify(msg);
        this.messages.next(message);
    }



    }





export class Orderparent {
    private order: Order[];
}
