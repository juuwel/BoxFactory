import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { NgApexchartsModule } from "ng-apexcharts";
import {HomeComponent} from "./home/home.component";
import {BoxListModule} from "./boxlist/boxlist.module";
import {NG_VALIDATORS, ReactiveFormsModule} from "@angular/forms";
import {positiveNumberValidator} from "./positiveNumberValidator";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule,
    BoxListModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
