import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-class1-event-request',
  templateUrl: './class1-event-request.component.html',
  styleUrls: ['./class1-event-request.component.css']
})
export class Class1EventRequestComponent implements OnInit {
  eventInitiation : FormGroup;
  eventInitiation1 : FormGroup;
  eventInitiation2 : FormGroup;
  eventInitiation3 : FormGroup;
  eventinitiation4 : FormGroup;

  // Data From sheet:
  eventDetails : any;
  hcpRoles : any

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
    
    this.eventInitiation = new FormGroup({
      withIn30days : new FormControl('',Validators.required),
      uploadDeviation1 : new FormControl(''),
      withIn7days : new FormControl(''),
      uploadDeviation2 : new FormControl('')
     
    })

    this.eventInitiation1 = new FormGroup({
      eventType : new FormControl('',[Validators.required]),
      eventTopic : new FormControl('', [Validators.required]),
      eventDate : new FormControl('',[Validators.required]),
      startTime : new FormControl('', [Validators.required]),
      endTime : new FormControl('',[Validators.required]),
      venueName : new FormControl('', [Validators.required]),
      state : new FormControl('',[Validators.required]),
      city : new FormControl('', [Validators.required])
      
    })

    this.eventInitiation2 = new FormGroup({
      brandName : new FormControl('',[Validators.required]),
      percentageAllocation : new FormControl('',[Validators.required]),
      projectId : new FormControl('', [Validators.required]),
      eventCode : new FormControl('',[Validators.required])
    })

    this.eventInitiation3 = new FormGroup({
      hcpRole : new FormControl('',[Validators.required]),
      hcpRoleWritten : new FormControl('',[Validators.required]),
      misCode : new FormControl('', [Validators.required]),
      speakerName : new FormControl('',[Validators.required]),
      speakerCode : new FormControl('',[Validators.required]),
      speaciality : new FormControl('',[Validators.required]),
      tier : new FormControl('',[Validators.required]),
      goNonGo : new FormControl('',[Validators.required])
    })

    this.eventinitiation4 = new FormGroup({
      presentationDuration : new FormControl('',[Validators.required])
    })
  }

  ngOnInit(): void {
    this.eventInitiation.valueChanges.subscribe(changes => {
      console.log(changes)
      this.toUploadDeviation1 = (changes.withIn30days == 'Yes')? true : false;
      this.toUploadDeviation2 = (changes.withIn7days == 'Yes')? true : false;
      // if(changes.withIn30days == 'Yes') this.toUploadDeviation1 = true;
      // else 
    })
  }


  // Adding value to table
  showBrandTable : boolean = false;
  brandTableDetails : any[] = [];
  addToBrandTable(){
    if(this.eventInitiation2.valid){
      console.log(this.eventInitiation2.value)
      this.brandTableDetails.push(this.eventInitiation2.value);
      this.showBrandTable = true;
      this.eventInitiation2.reset()
    }
  }
}
