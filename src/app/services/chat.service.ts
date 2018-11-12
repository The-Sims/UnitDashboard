import { Injectable } from '@angular/core';
import {Observable,Subject} from 'rxjs';
import {WebsocketService} from './websocket.service';
import 'rxjs/add/operator/map'



const CHAT_URL='ws://145.93.112.154:8095/unitmanagerserver/websocket/';

export interface Message {

    message: string

}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public  messages: Subject<Message>;

  constructor(wsService: WebsocketService) {

      this.messages = <Subject<Message>>wsService
          .connect(CHAT_URL)
          .map((response: MessageEvent): Message => {
              let data = JSON.stringify(response.data);
              return {
                  message: data
              }
          });

  }
}
