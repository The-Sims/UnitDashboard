import { Component } from '@angular/core';
import { WebsocketService} from './services/websocket.service';
import { ChatService} from './services/chat.service';
import { MessageConcludeOrder} from './Dto/MessageConcludeOrder';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    providers:[WebsocketService,ChatService]
})
export class AppComponent {
    constructor(private chatService: ChatService){
        chatService.messages.subscribe(msg=>{
            console.log("Response from websocket:"+ msg.message);

        });
    }

    sendMsg(){

        this.chatService.messages.next(new MessageConcludeOrder(1,"Done"));
       // this.MessageConcludeOrder.message='';
        console.log('new msg from client to web')
    }
  title = 'DienstFront-app';
}
