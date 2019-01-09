import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Order} from "../models/Order";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class DataService {
  private order:Order;
  private id:string;
  constructor() { }

  changeOrder(order:Order){
    this.order = order;
  }
  getOrder(){
    return this.order;
  }

  changeId(id:string){
    this.id =id;
  }
  getId(){
    return this.id;
  }


}
