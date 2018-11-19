import { Injectable } from '@angular/core';
import {Observable,Subject} from 'rxjs';
import {WebsocketService} from './websocket.service';
import 'rxjs/add/operator/map'
import {Message} from '../models/Message';
import {EncapsulatingMessage} from "../../messages/EncapsulatingMessage";



const CHAT_URL='ws:/localhost:8095/unitmanagerserver/websocket/';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public  messages: Subject<EncapsulatingMessage>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<EncapsulatingMessage>>wsService
      .connect(CHAT_URL)
      .map((response: MessageEvent): EncapsulatingMessage => {
        console.log(response.data)
        let msg = new EncapsulatingMessage(JSON.parse(response.data));
        return msg;
      });

  }
}
