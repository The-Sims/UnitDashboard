import {Component, OnInit} from '@angular/core';
import {MessageRegister} from "../../messages/MessageRegister";
import {OrderService} from "../services/order.service";
import { Router} from "@angular/router";
import {DataService} from "../services/data.service";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    constructor(private chat:OrderService, private router: Router,private  data:DataService) {

    }

    sendLogin(name: string) {
        this.data.changeId(name);
        this.router.navigate(['/Home']);
        let obj = new MessageRegister(name);
        console.log(name);
        this.chat.sendMsg(obj);
    }

    ngOnInit() {

    }

}
