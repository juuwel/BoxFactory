import {Component, OnInit} from '@angular/core';
import {BoxService} from "../../services/box-service";
import {DimensionsDto} from "../../interfaces/dimension-interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {positiveNumberValidator} from "../../positiveNumberValidator";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'update-box',
  templateUrl: './updatebox.component.html',
})
export class UpdateboxComponent implements OnInit {
  boxId: string = "";
  dimensions: DimensionsDto;
  boxForm = new FormGroup({
    weight: new FormControl(0, [Validators.required, positiveNumberValidator]),
    length: new FormControl(0, [Validators.required, positiveNumberValidator]),
    width: new FormControl(0, [Validators.required, positiveNumberValidator]),
    height: new FormControl(0, [Validators.required, positiveNumberValidator]),
    price: new FormControl(0, [Validators.required, positiveNumberValidator]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]),
    colour: new FormControl(''),
    material: new FormControl(''),
  });

  constructor(public boxService: BoxService, private activatedRoute: ActivatedRoute) {
    this.dimensions = {height: 0, width: 0, length: 0};
  }

  async ngOnInit() {
    this.boxId = this.activatedRoute.snapshot.params['boxId'];

    let box = await this.boxService.getbyId(this.boxId);

    this.boxForm.controls.weight.setValue(box.weight);
    this.boxForm.controls.colour.setValue(box.colour!);
    this.boxForm.controls.material.setValue(box.material!);
    this.boxForm.controls.height.setValue(box.dimensions!.height);
    this.boxForm.controls.width.setValue(box.dimensions!.width);
    this.boxForm.controls.length.setValue(box.dimensions!.length);
    this.boxForm.controls.price.setValue(box.price);
    this.boxForm.controls.stock.setValue(box.stock);
  }

  async onUpdateBox(event: Event) {
    console.log(this.boxForm.valid);
    if (this.boxForm.valid) {
      try {
        const updatedBox = await this.boxService.update(this.boxId,{
          weight: this.boxForm.controls.weight.value!,
          colour: this.boxForm.controls.colour.value || "",
          material: this.boxForm.controls.material.value || "",
          dimensionsDto: {
            height: this.boxForm.controls.height.value!,
            width: this.boxForm.controls.width.value!,
            length: this.boxForm.controls.length.value!
          },
          price: this.boxForm.controls.price.value!,
          stock: this.boxForm.controls.stock.value!
        });
        const index = this.boxService.boxes.findIndex(
          (box) => box.id === updatedBox.id
        );
        if (index !== -1) {
          this.boxService.boxes.splice(index, 1, updatedBox);
        }
        this.boxForm.reset();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Invalid form");
    }
  }
}
