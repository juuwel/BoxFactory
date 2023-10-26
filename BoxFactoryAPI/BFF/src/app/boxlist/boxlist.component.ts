import {Component} from '@angular/core';
import {BoxService} from "../services/box-service";

@Component({
  selector: 'app-box',
  templateUrl: './boxlist.component.html',
})
export class BoxListComponent {

  constructor(private boxService: BoxService) {
  }
  onSearchClick(value: string) {
    this.boxService.get(1, value);
    console.log(value); // For testing purpose
  }
}
