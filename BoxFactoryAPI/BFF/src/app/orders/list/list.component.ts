import {Component} from '@angular/core';
import {OrderService} from "../../services/order-service";
import {ShippingStatus} from "../../interfaces/order-interface";

@Component({
  selector: 'app-order-list',
  templateUrl: './list.component.html',
})
export class ListComponent {

  constructor(public orderService: OrderService) {
  }

  protected readonly Object = Object;
  protected readonly ShippingStatus = ShippingStatus;

  changeStatus(id: string, status: ShippingStatus) {
    this.orderService.updateStatus(id, {shippingStatus: status}).then(r => {
      this.orderService.get();
    });
  }
}
