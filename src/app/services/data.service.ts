import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Order} from "../models/Order";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class DataService {
  private order:Order;
  constructor() { }

  changeOrder(order:Order){
    this.order = order;
  }
  getORder(){
    return this.order
  }
}
