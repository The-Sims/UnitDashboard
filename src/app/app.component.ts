import {Component} from '@angular/core';
import {OrderService} from "./services/order.service";



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],

})
export class AppComponent {
    title = 'DienstFrontApp';
    constructor() {
    }
}
