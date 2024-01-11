import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-honararium-payment-request',
  templateUrl: './honararium-payment-request.component.html',
  styleUrls: ['./honararium-payment-request.component.css']
})
export class HonarariumPaymentRequestComponent implements OnInit {

  stepper: any;
  honorarium:FormGroup;
  Is2DaysUpload:boolean=false;
  isItGST:boolean=false;
  Islessthen5:boolean=false;
  
  
    constructor() {
      this.honorarium = new FormGroup({
        workingdays:new FormControl('',Validators.required),
        uploadDeviation:new FormControl('',Validators.required),
        UploadSpeakerAgreement:new FormControl('',Validators.required),
        UploadPhotos:new FormControl('',Validators.required),
        UploadFinalHonorariumDetails:new FormControl('',Validators.required),
        IsitincludingGST:new FormControl('',Validators.required),
        UploadDetails:new FormControl('',Validators.required),
        Entertotalattendance:new FormControl('',Validators.required),
        IsInviteeslessthan5:new FormControl('',Validators.required),
        UploadDetails1:new FormControl('',Validators.required)
    
      })
   
  }
    ngOnInit(): void {
      
    }
  
    showUpload()
    {
      this.honorarium.valueChanges.subscribe(chanegs => 
        {
          this.Is2DaysUpload = (chanegs.workingdays == 'Yes')?true:false;
          this.isItGST = (chanegs.includingGST == 'Yes')?true:false;
          this.Islessthen5 = (chanegs.IsInviteeslessthan5 == 'Yes')?true:false;
        })
    }
  
}
