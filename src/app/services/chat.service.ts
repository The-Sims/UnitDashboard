import { Injectable } from '@angular/core';
import {Observable,Subject} from 'rxjs';
import {WebsocketService} from './websocket.service';
import 'rxjs/add/operator/map'
import {Message} from '../models/Message';



const CHAT_URL='ws://145.93.113.53:8095/unitmanagerserver/websocket/';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public  messages: Subject<Object>;
  private message: Message
  constructor(wsService: WebsocketService) {

      this.messages = <Subject<Object>>wsService
          .connect(CHAT_URL)
          .map((response: MessageEvent): Object =>  {
              let data = JSON.parse(response.data);
              return {object: data}
          });

  }
}
