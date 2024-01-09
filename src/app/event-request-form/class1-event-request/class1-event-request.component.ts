import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-class1-event-request',
  templateUrl: './class1-event-request.component.html',
  styleUrls: ['./class1-event-request.component.css']
})
export class Class1EventRequestComponent implements OnInit {
  eventInitiation1 : FormGroup;
  eventInitiation2 : FormGroup;
  eventInitiation3 : FormGroup;
  eventInitiation4 : FormGroup;
  eventInitiation5 : FormGroup;
  eventInitiation6 : FormGroup;
  eventInitiation7 : FormGroup;

  // Data From sheet:
  eventDetails : any;
  hcpRoles : any
  brandNames : any;

  // Upload Deviationn
  toUploadDeviation1: boolean = false
  toUploadDeviation2: boolean = false


  // For Stepper Validation
  isLinear: boolean = false;

  constructor(private utilityService : UtilityService) {
    // Getting event types
    utilityService.getEventTypes().subscribe(
      res => {
        this.eventDetails = res;
      },
      err => {
        alert('Unexpected error Happened')
      }
    )

    // Getting HCP Roles
    utilityService.getHcpRoles().subscribe(
      res => {
        this.hcpRoles = res;
        console.log(this.hcpRoles)
      },
      err =>{
        alert("Unexpected Error Happened")
      }

    )

    // Getting BrandNames
    utilityService.getBrandNames().subscribe(
      res => {
        this.brandNames = res;
      },
      err => {
        alert("Unexpected Error Happened")
      }
    )
    
    this.eventInitiation1 = new FormGroup({
      withIn30days : new FormControl('',Validators.required),
      uploadDeviation1 : new FormControl(''),
      withIn7days : new FormControl('',Validators.required),
      uploadDeviation2 : new FormControl('')
     
    })

    this.eventInitiation2 = new FormGroup({
      eventType : new FormControl('',[Validators.required]),
      eventTopic : new FormControl('', [Validators.required]),
      eventDate : new FormControl('',[Validators.required]),
      startTime : new FormControl('', [Validators.required]),
      endTime : new FormControl('',[Validators.required]),
      venueName : new FormControl('', [Validators.required]),
      state : new FormControl('',[Validators.required]),
      city : new FormControl('', [Validators.required])
      
    })

    this.eventInitiation3 = new FormGroup({
      brandName : new FormControl('',[Validators.required]),
      percentageAllocation : new FormControl('',[Validators.required]),
      projectId : new FormControl('', [Validators.required]),
      eventCode : new FormControl('',[Validators.required])
    })

    this.eventInitiation4 = new FormGroup({
      hcpRole : new FormControl('',[Validators.required]),
      hcpRoleWritten : new FormControl('',[Validators.required]),
      misCode : new FormControl('', [Validators.required]),
      speakerName : new FormControl('',[Validators.required]),
      speakerCode : new FormControl('',[Validators.required]),
      speaciality : new FormControl('',[Validators.required]),
      tier : new FormControl('',[Validators.required]),
      goNonGo : new FormControl('',[Validators.required])
    })

    this.eventInitiation5 = new FormGroup({
      presentationDuration : new FormControl('',[Validators.required]),
      panelSessionPreparation : new FormControl('',[Validators.required]),
      qaSession : new FormControl('',[Validators.required]),
      briefingDuration : new FormControl('',[Validators.required]),
      totalHours : new FormControl('',[Validators.required])
    })

    this.eventInitiation6 = new FormGroup({
      isHonararium : new FormControl('',[Validators.required]),
      uploadNOC : new FormControl('',),
      rationale : new FormControl('',),
      currency : new FormControl('',[Validators.required]),
      otherCurrency : new FormControl('',),
      taxSelect : new FormControl('',[Validators.required]),
      benficiaryName : new FormControl('',[Validators.required]),
      bankAccountNumber : new FormControl('',[Validators.required]),
      nameAsPan : new FormControl('',[Validators.required]),
      panCardNumber : new FormControl('',[Validators.required]),
      ifscCode : new FormControl('',[Validators.required]),
      emailId : new FormControl(''),
      uploadPAN : new FormControl('',[Validators.required]),
      uploadCheque : new FormControl('',[Validators.required])
    })

    this.eventInitiation7 = new FormGroup({
      invitee : new FormControl('',[Validators.required]),
      expense : new FormControl('',[Validators.required]),
      expenseAmount : new FormControl('',[Validators.required]),
      isExcludingTax : new FormControl('',[Validators.required]),
      uploadExpenseDeviation : new FormControl('',[Validators.required]),
      isBtc : new FormControl('',[Validators.required]),
      toCalculateExpense : new FormControl('',[Validators.required]),
      finalAmount : new FormControl('',[Validators.required]),
      btcTotalAmount : new FormControl('',[Validators.required]),
      bteTotalAmount : new FormControl('',[Validators.required]),
      uploadAgenda : new FormControl('',[Validators.required]),
      uploadInvitation : new FormControl('',[Validators.required])
    })
  }

  ngOnInit(): void {
    this.event1FormPrepopulate();
    this.event4FormPrepopulate();
    this.event6FormPrepopulate();
    
  }

  // Event Initiation Form1 COntrol
  event1FormPrepopulate(){
    this.eventInitiation1.valueChanges.subscribe(changes => {
      // console.log(this.eventInitiation1.controls.uploadDeviation1.valid)
      this.toUploadDeviation1 = (changes.withIn30days == 'Yes')? true : false;
      this.toUploadDeviation2 = (changes.withIn7days == 'Yes')? true : false;
      if(this.toUploadDeviation1) this.eventInitiation1.controls.uploadDeviation1.addValidators([Validators.required])
      else {
          this.eventInitiation1.controls.uploadDeviation1.setValidators(null)
          // this.eventInitiation1.controls.uploadDeviation1.setValue('aa')
          // this.eventInitiation1.
          // this.eventInitiation1.controls.uploadDeviation1.reset();
          // console.log(this.eventInitiation1.controls.uploadDeviation1.valid)
          
      }
      if(this.toUploadDeviation2) this.eventInitiation1.controls.uploadDeviation2.addValidators([Validators.required])
     
    })
  }

  


  // Event Initiation Form3 Control

  // Adding value to Brand Tables
  showBrandTable : boolean = false;
  brandTableDetails : any[] = [];
  addToBrandTable(){
    if(this.eventInitiation2.valid){
      console.log(this.eventInitiation3.value)
      this.brandTableDetails.push(this.eventInitiation2.value);
      this.showBrandTable = true;
      this.eventInitiation2.reset()
    }
  }



  // Event Initiation Form4 Control
  showHCPRoleNameTextBox : boolean = false;

  event4FormPrepopulate(){
    
    this.eventInitiation4.valueChanges.subscribe(changes => {
      console.log(changes)
      if(changes.hcpRole == "H6"){
        this.showHCPRoleNameTextBox = true;
      }
      else{
        this.showHCPRoleNameTextBox = false;
      }

      if(changes.goNonGo == "GO"){
        this.showUploadNOC = true;
        this.showRationale = true;
      }
      else{
        this.showUploadNOC = false;
        this.showRationale = false;
      }
    })

  }

  // Event Initiation Form6 Control
  showUploadNOC : boolean = false;
  showRationale :boolean = false;
  showOtherCurrencyTextBox : boolean = false;

  event6FormPrepopulate(){
    this.eventInitiation6.valueChanges.subscribe(
      changes => {
        console.log(changes)
        if(changes.currency == 'other'){
          this.showOtherCurrencyTextBox = true;
        }
        else{
          this.showOtherCurrencyTextBox = false
        }
      }
    )
  }


}
