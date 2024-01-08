import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-class1-event-request',
  templateUrl: './class1-event-request.component.html',
  styleUrls: ['./class1-event-request.component.css']
})
export class Class1EventRequestComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder) {}
  ngOnInit(): void {
  }

  submit(){
    console.log(this.firstFormGroup);
    console.log(this.secondFormGroup)
  }

}
