import { NgModule } from '@angular/core';
import {BoxListComponent} from "./boxlist.component";
import {ListComponent} from "./list/list.component";
import {CommonModule} from "@angular/common";
import {CreateboxComponent} from "./(create)/createbox.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UpdateboxComponent} from "./(update)/updatebox.component";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    BoxListComponent,
    ListComponent,
    CreateboxComponent,
    UpdateboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  providers: [],
  bootstrap: [BoxListComponent]
})
export class BoxListModule { }
