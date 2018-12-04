import {Component, OnInit} from '@angular/core';
import {MessageRegister} from "../../messages/MessageRegister";
import {ChatService} from "../services/chat.service";
import {Router} from "@angular/router";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    constructor(private chat:ChatService,private router: Router) {

    }

    sendLogin(test: string) {
        this.router.navigate(['/Home']);
        let obj = new MessageRegister(test);
        console.log(test)
        this.chat.sendMsg(obj)
    }

    ngOnInit() {

    }

}
