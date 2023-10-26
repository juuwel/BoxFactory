import {Component, OnInit} from '@angular/core';
import {BoxService} from "../../services/box-service";
import {BoxUpdateDto, PaginatedBoxList} from "../../interfaces/box-inteface";

@Component({
  selector: 'app-box-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

  currentPage: number = 0;
  // @ts-ignore
  buttons: any[];

  constructor(public boxService: BoxService) {
  }

  async ngOnInit() {
    let result = await this.boxService.get(this.currentPage+1,"10", "");
    this.buttons = Array(result.pageCount).fill(null);
    console.log(result.pageCount);
  }
  async getNextPage(page: number) {
    this.currentPage = page;
    try {
      let result = await this.boxService.get(this.currentPage + 1,"10", "");
      console.log(result);
      // Update your component state based on the result here
    } catch (err) {
      // Handle errors here.
      console.log(err);
    }
  }

  async deleteBox(boxId: string) {
    try {
      this.boxService.delete(boxId);
      this.boxService.boxes = this.boxService.boxes.filter(b => b.id != boxId);
    } catch (error) {
      console.error(error);
    }
  }

  async updateBox(boxId: string, boxUpdateDto: BoxUpdateDto) {
    try {
      this.boxService.update(boxId, boxUpdateDto);
    } catch (error) {
      console.error(error);
    }
  }
}
