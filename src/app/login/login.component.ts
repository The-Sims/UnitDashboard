import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {MessageRegister} from "../../messages/MessageRegister";
import {AppComponent} from "../app.component";
import {ChatService} from "../services/chat.service";
import {MessageSenderService} from "../services/message-sender.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email=new FormControl();
    private messageSender:MessageSenderService;
  constructor() {this.messageSender = new MessageSenderService() }

  onSubmit(){
      let obj = new MessageRegister(this.email.value);
      //this.messageSender.sendMsg(obj)
  }
  ngOnInit() {
  }

}
