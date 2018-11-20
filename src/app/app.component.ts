import { Component } from '@angular/core';
import { WebsocketService} from './services/websocket.service';
import {ChatService} from './services/chat.service';
import {EncapsulatingMessage} from "../messages/EncapsulatingMessage";
import {MessageOrder} from "../messages/MessageOrder";
import {MessageConfirmOrder} from "../messages/MessageConfirmOrder";
import {Order} from "./models/Order";
import {HomeComponent} from "./home/home.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[WebsocketService,ChatService]
})
export class AppComponent {

  constructor(){};

  }

export class Orderparent {
  private order:Order[];

}