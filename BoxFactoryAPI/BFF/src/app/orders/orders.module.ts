import { NgModule } from '@angular/core';
import {OrdersComponent} from "./orders.component";
import {ListComponent} from "./list/list.component";
import {CommonModule} from "@angular/common";
import {CreateorderComponent} from "./(create)/createorder.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    OrdersComponent,
    ListComponent,
    CreateorderComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [OrdersComponent]
})
export class OrdersModule { }
