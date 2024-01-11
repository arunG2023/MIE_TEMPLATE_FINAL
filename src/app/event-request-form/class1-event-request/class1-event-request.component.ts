import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormControlName, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-class1-event-request',
  templateUrl: './class1-event-request.component.html',
  styleUrls: ['./class1-event-request.component.css']
})

// declare const $: any;
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
 

  // Upload Deviationn
  toUploadDeviation1: boolean = false
  toUploadDeviation2: boolean = false


  // For Stepper Validation
  isLinear: boolean = false;
  orientation : string ;

  constructor(private utilityService : UtilityService, private auth : AuthService, private router : Router) {
    this.isMobileMenu();
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
        this.filterBrandDetailsForClass1();
      },
      err => {
        alert("Unexpected Error Happened")
      }
    )

    // Getting Approved Speakers
    utilityService.getApprovedSpeakers().subscribe(
      res => {
        // console.log(res)
        this.approvedSpeakers = res;
      }
    )

    // Get All States
    utilityService.getAllStates().subscribe(
      res => {
        this.allStates = res;
      }
    )

    // Get All Cities
    utilityService.getAllCities().subscribe(
      res => this.allCity = res
    )

    // Get Vendor Details
    utilityService.getVendorDetails().subscribe(
      res => this.vendorDetails = res
    )
    
    this.eventInitiation1 = new FormGroup({
      withIn30days : new FormControl('',Validators.required),
      uploadDeviation1 : new FormControl('', ),
      withIn7days : new FormControl('',Validators.required),
      uploadDeviation2 : new FormControl('')
     
    })

    this.eventInitiation2 = new FormGroup({
      // eventType : new FormControl('EVT1',[Validators.required]),
      eventTopic : new FormControl('', [Validators.required]),
      eventDate : new FormControl('',[Validators.required]),
      startTime : new FormControl('',[Validators.required]),
      endTime : new FormControl('',endTimeValidator),
      venueName : new FormControl('', [Validators.required]),
      state : new FormControl('',[Validators.required]),
      city : new FormControl('', [Validators.required])
      
    })

    this.eventInitiation3 = new FormGroup({
      brandName : new FormControl('',[Validators.required]),
      // percentageAllocation : new FormControl('',[Validators.required]),
      // projectId : new FormControl('', [Validators.required]),
      // eventCode : new FormControl('',[Validators.required])
    })

    this.eventInitiation4 = new FormGroup({
      hcpRole : new FormControl('',[Validators.required]),
      // hcpRoleWritten : new FormControl('',[Validators.required]),
      misCode : new FormControl('', MISValidator),
      // speakerName : new FormControl('',[Validators.required]),
      // speakerCode : new FormControl('',[Validators.required]),
      // speaciality : new FormControl('',[Validators.required]),
      // tier : new FormControl('',[Validators.required]),
      // goNonGo : new FormControl('',[Validators.required])
    })

    this.eventInitiation5 = new FormGroup({
      presentationDuration : new FormControl(0,[Validators.required]),
      panelSessionPreparation : new FormControl(0,[Validators.required]),
      qaSession : new FormControl(0,[Validators.required]),
      briefingDuration : new FormControl(0,[Validators.required]),
      panelDiscussionDuration : new FormControl(0,[Validators.required]),
      // totalHours : new FormControl('',[Validators.required])
    })

    this.eventInitiation6 = new FormGroup({
      isHonararium : new FormControl('No',[Validators.required]),
      uploadNOC : new FormControl('',),
      rationale : new FormControl('',),
      // currency : new FormControl('',[Validators.required]),
      // otherCurrency : new FormControl('',),
      // taxSelect : new FormControl({value : '',disabled : !this.isHonararium}),
      // benficiaryName : new FormControl('',[Validators.required]),
      bankAccountNumber : new FormControl(' ',[Validators.required]),
      // nameAsPan : new FormControl('',[Validators.required]),
      // panCardNumber : new FormControl('',[Validators.required]),
      // ifscCode : new FormControl('',[Validators.required]),
      // emailId : new FormControl(''),
      // uploadPAN : new FormControl('',[Validators.required]),
      // uploadCheque : new FormControl('',[Validators.required])
    })

    this.eventInitiation7 = new FormGroup({
      invitee : new FormControl('',[Validators.required]),
      expense : new FormControl('',[Validators.required]),
      expenseAmount : new FormControl(0,),
      isLocalConveyance : new FormControl('No',),
      isAdvanceRequired : new FormControl('',Validators.required),
      isExcludingTax : new FormControl('',[Validators.required]),
      uploadExpenseDeviation : new FormControl('',[Validators.required]),
      isBtc : new FormControl('',[Validators.required]),
      toCalculateExpense : new FormControl('No',[Validators.required]),
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
    this.event2FormPrepopulate();
    this.event3FormPrepopulate();
    this.event5FormPrepopulate();
    this.event7FormPrepopulate();
    
  }

  // Event Initiation Form1 COntrol
  static upload1: any ;
  static withIn30Days : boolean;
 

  event1FormPrepopulate(){
   
    this.eventInitiation1.valueChanges.subscribe(changes => {
      // Class1EventRequestComponent.upload1 = changes.uploadDeviation1;
      // if(changes.uploadDeviation1){
      //   // console.log(changes.uploadDeviation1)
      //   // Class1EventRequestComponent.upload1 = changes.uploadDeviation1;
      //   // Step1Validator(changes.uploadDeviation1);
       
      // }
      // console.log(this.eventInitiation1.controls.uploadDeviation1.valid)
      this.toUploadDeviation1 = (changes.withIn30days == 'Yes')? true : false;
      this.toUploadDeviation2 = (changes.withIn7days == 'Yes')? true : false;
      if(this.toUploadDeviation1) Class1EventRequestComponent.withIn30Days = true;
      else Class1EventRequestComponent.withIn30Days = false;
      // if(this.toUploadDeviation1) this.eventInitiation1.controls.uploadDeviation1.addValidators([Validators.required])
      // else {
      //     this.eventInitiation1.controls.uploadDeviation1.setValidators(null)
      //     // this.eventInitiation1.controls.uploadDeviation1.setValue('aa')
      //     // this.eventInitiation1.
      //     // this.eventInitiation1.controls.uploadDeviation1.reset();
      //     // console.log(this.eventInitiation1.controls.uploadDeviation1.valid)
          
      // }
      // if(this.toUploadDeviation2) this.eventInitiation1.controls.uploadDeviation2.addValidators([Validators.required])
     
    })
  }

  // Event Initiation Form2 Control
  static startTime : any;

  allStates : any;
  allCity : any;
  filteredCity : any;

  // New Values
  eventType : string = 'EVT1'

  event2FormPrepopulate(){
    this.eventInitiation2.valueChanges.subscribe(changes => {
      if(changes.startTime){
        // console.log(changes.startTime)
        Class1EventRequestComponent.startTime = changes.startTime;
      }
      if(changes.state){
        this.filteredCity = this._filterCity(changes.state)
      }
    })

  }

  private _filterCity(stateId){
    return this.allCity.filter(city => city.StateId === stateId)

  }

  

  


  // Event Initiation Form3 Control

  // Adding value to Brand Tables
  showBrandTable : boolean = false;
  brandTableDetails : any[] = [];

  brandNames : any;

  // New Values:
  percentageAllocation: number = 0;
  projectId : string = '';
  eventCode : string = this.eventType;

  
  filterBrandDetailsForClass1(){
    this.brandNames = this.brandNames.filter(brand => {
        const name = brand.Name.split("_")
        return name[1] == 'Class I';
      // return brand.Name.toLowerCase().includes('classi');
    })
    // console.log(this.brandNames)
    
  }
  addToBrandTable(){
    // console.log(this.eventInitiation3.valid)
    if(this.eventInitiation3.valid){
      // console.log(this.eventInitiation3.value)
      // this.brandTableDetails.push(this.eventInitiation3.value);
      // this.showBrandTable = true;
      // 
      const brand = {
        brandName : this.brandNames.find(brand => brand.BrandId == this.eventInitiation3.value.brandName).BrandName,
        percentageAllocation : this.percentageAllocation,
        projectId : this.projectId
      }
      this.brandTableDetails.push(brand);
      this.showBrandTable = true;
      this.eventInitiation3.reset();
      this.percentageAllocation = 0;
      this.projectId = '';
      this.eventCode = this.eventType;

    }
  }

  event3FormPrepopulate(){
    this.eventInitiation3.valueChanges.subscribe(changes => {
      if(changes.brandName){
        console.log(changes.brandName)
        // console.log(this.getBrandWithId(changes.brandName))
        const selectedBrand = this._getBrandWithId(changes.brandName);
        this.projectId = selectedBrand.ProjectId;
        this.percentageAllocation = selectedBrand['%Allocation'] * 100;
      }

    })
  }

  private _getBrandWithId(brandId){
    return this.brandNames.find(brand => brand.BrandId == brandId)
  }

  sendBrandDetails(){
    console.log(this.brandTableDetails)
  }



  // Event Initiation Form4 Control
  showHCPRoleNameTextBox : boolean = false;
  approvedSpeakers : any;
  filteredspeakers : any;

  speakerName: string = '';
  speakerCode : string = '';
  speciality : string = '';
  tier : string = '';
  goNonGo : string = '';
  hcpRoleWritten : string = '';

  event4FormPrepopulate(){
    
    this.eventInitiation4.valueChanges.subscribe(changes => {
      console.log(changes)
      if(changes.hcpRole == "H6"){
        this.showHCPRoleNameTextBox = true;
      }
      else{
        this.showHCPRoleNameTextBox = false;
      }

      // if(changes.goNonGo == "GO"){
      //   this.showUploadNOC = true;
      //   this.showRationale = true;
      // }
      // else{
      //   this.showUploadNOC = false;
      //   this.showRationale = false;
      // }

      if(changes.misCode !== ''){
        // console.log(this._filter(changes.misCode))
        this.filteredspeakers = this._filter(changes.misCode);

        if(this.eventInitiation4.controls.misCode.valid){
          // console.log("MIS Valli")
          // console.log(this._getFilteredSpeaker(changes.misCode))
          const filteredSpeaker = this._getFilteredSpeaker(changes.misCode);
          // console.log(filteredSpeaker)
          if(filteredSpeaker){
            this.speakerName  = filteredSpeaker.SpeakerName;
            this.speakerCode = filteredSpeaker.SpeakerCode;
            this.speciality = filteredSpeaker.Speciality;
            this.goNonGo = (filteredSpeaker.isNonGO == "yes")? 'Non GO' : 'GO';
            this.tier = filteredSpeaker.TierType;  

            this.getRemuneration(this.speciality,this.tier);
          }
          else{
            this.speakerName  = "";
            this.speakerCode = "";
            this.speciality = "";
            this.goNonGo = "";
            this.tier = "";
          }
         
          if(this.goNonGo == "GO"){
            this.showUploadNOC = true;
            this.showRationale = true;
          }
          else{
            this.showUploadNOC = false;
            this.showRationale = false;
          }
        }
      }
    })
  }

  private _filter(value: string): string[] {
    // console.log(this.employeeDetails)
    const filterValue = value.toLowerCase();
    return this.approvedSpeakers.filter(emp => emp.MISCode.toLowerCase().includes(filterValue));
  }

  private _getFilteredSpeaker(misCode){
    return this.approvedSpeakers.find(speaker => {
      return speaker.MISCode === misCode
    })

  }

  // Event Initiation Form5 Control
  totalHours : any;
  remuneration : any;
  remunerationToCalculate : any;
  event5FormPrepopulate(){
    this.eventInitiation5.valueChanges.subscribe(
      changes => {
        // console.log(changes);
        
        this.totalHours = ((changes.presentationDuration + changes.panelDiscussionDuration + 
                          changes.panelSessionPreparation + changes.qaSession + changes.briefingDuration)/60).toFixed(2);
        if(this.totalHours >= 8){
          alert("Max of 8 hours only")
        }
        this.remuneration = (this.remunerationToCalculate * this.totalHours);

      }
    )
  }

  getRemuneration(speciality,tier){
    this.utilityService.getFmv(speciality,tier).subscribe(
      res => {
        console.log(res)
        this.remunerationToCalculate = res;
      },
      err => {
        alert("Unexpected Error Happened")
      }
    )
  }


  // Event Initiation Form6 Control
  showUploadNOC : boolean = false;
  showRationale :boolean = false;
  showOtherCurrencyTextBox : boolean = false;

  vendorDetails : any ;
  filteredAccounts : any;

  isHonararium : boolean = false;
  isVendorPresent : boolean = false;
  // Additional Values:
  currency : string = '';
  otherCurrency : string = ''
  taxSelect : string = '';
  benificiaryName : string = ''
  bankAccountNumber : string = ''
  nameAsPan : string = ''
  panCardNumber : string = ''
  ifscCode : string = ''
  emailId : string = ''
  uploadPAN : any = '';
  uploadCheque : any = '';

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
        if(changes.isHonararium == "Yes"){
          this.isHonararium = true;
          // this.eventInitiation6.get('bankAccountNumber').enable();
          
        }
        else{
          this.isHonararium = false
          this.bankAccountNumber = '';
          this.nameAsPan = '';
          this.panCardNumber = '';
          this.ifscCode = '';
          this.emailId = '';
        }
        if(changes.bankAccountNumber){
          // console.log(changes.bankAccountNumber)
          // console.log(this._filterBankAccounts(changes.bankAccountNumber))
          this.filteredAccounts = this._filterBankAccounts(changes.bankAccountNumber);
          if(this.eventInitiation6.controls.bankAccountNumber.valid){
            // console.log(this._getSelectedBankDetails(changes.bankAccountNumber))
            const filteredVendor = this._getSelectedBankDetails(changes.bankAccountNumber);
            if(filteredVendor){
              this.isVendorPresent = true;
              this.bankAccountNumber = filteredVendor.BankAccountNumber;
              this.benificiaryName = filteredVendor.BeneficiaryName;
              this.nameAsPan = filteredVendor.PanCardName;
              this.panCardNumber = filteredVendor.PanNumber;
              this.ifscCode = filteredVendor.IfscCode
            }
          }
        }
      }
    )
  }
  private _getSelectedBankDetails(acctNumber : any){
    return this.vendorDetails.find(ven => {
      if(ven.BankAccountNumber){
        // console.log(typeof ven.BankAccountNumber);
        // console.log(typeof acctNumber)
        return ven.BankAccountNumber == acctNumber
      }
    })
  }

  private _filterBankAccounts(value: string): string[] {
    // console.log(this.employeeDetails)
    const filterValue = value.toLowerCase();
    
    return this.vendorDetails.filter(ven =>{
      
      if(ven.BankAccountNumber){
        const bannAccNum = ven.BankAccountNumber.toString();
        
        return bannAccNum.includes(filterValue);
      }
      
    })
  }

  // Event Inititaion Form7 COntrol
  showExpenseTextBox : boolean = false;
  showTotalExpense : boolean = false;

  expenseTableDetails : any;
  localConveyanceNeeded : boolean = false;

  event7FormPrepopulate(){
    this.eventInitiation7.valueChanges.subscribe(
      changes => {
      
        if(changes.expense == 'e2'){
          this.showExpenseTextBox = true;
        }
        else{
          this.showExpenseTextBox = false;
        }
        if(changes.toCalculateExpense == 'Yes'){
          this.showTotalExpense = true;
        }
        else{
          this.showTotalExpense = false;
        }
        if(changes.isLocalConveyance == 'Yes'){
          this.localConveyanceNeeded = true;
        }
        else this.localConveyanceNeeded = false;

        if(changes.invitee && changes.expense && changes.isAdvanceRequired && changes.isExcludingTax && changes.isBtc){
          console.log(changes)
        }
      }
    )
  }

  addInviteesToTable(){
    const invitee = {
      invitee : 'aa'
    };

  }
  
  


  submitForm(){
    // console.log(this.eventInitiation1.value);
    // console.log(this.eventInitiation2.value);
    // console.log(this.eventInitiation3.value);
    // console.log(this.eventInitiation4.value);
    // console.log(this.eventInitiation5.value);
    // console.log(this.eventInitiation6.value);
    // console.log(this.eventInitiation7.value);
    const class1FinalData1 = {
      EventTopic : this.eventInitiation2.value.eventTopic,
      EventType : this.eventDetails.find(event => event.EventTypeId == this.eventCode ).EventType,
      EventDate : new Date(this.eventInitiation2.value.eventDate),
      StartTime : this.eventInitiation2.value.startTime,
      EndTime : this.eventInitiation2.value.endTime,
      VenueName : this.eventInitiation2.value.venueName,
      State : this.allStates.find(state => state.StateId == this.eventInitiation2.value.state).StateName,
      City : this.allCity.find(city => city.CityId == this.eventInitiation2.value.city).CityName,
      // BeneficiaryName : this.benificiaryName,
      // BankAccountNumber : this.eventInitiation6.value.bankAccountNumber,
      // PanName : this.nameAsPan,
      // PanCardNumber : this.panCardNumber,
      // IfscCode : this.ifscCode,
      // EmailId : this.emailId,
      // Invitees : this.eventInitiation7.value.invitee,
      IsAdvanceRequired : this.eventInitiation7.value.isAdvanceRequired || 'No',
      // SelectionOfTaxes : this.taxSelect,
      BrandName : this._getBrandWithId(this.eventInitiation3.value.brandName).BrandName,
      HCPRole :   (this.eventInitiation4.value.hcpRole !== 'H6')? this.hcpRoles.find(role =>  role.HCPRoleID === this.eventInitiation4.value.hcpRole).HCPRole : this.hcpRoleWritten, 
      // InitiatorName : this.auth.decodeToken()['unique_name'],
      PercentAllocation : this.percentageAllocation.toString(),
      ProjectId : this.projectId,
    }
    console.log(class1FinalData1)
    this.utilityService.postEvent1Data1(class1FinalData1).subscribe(
      res => {
        console.log("Data added successfully");
        alert('Event Submitted Successfully');
        this.router.navigate(['dashboard']);
        
      },
      err => alert("Not Added")
    )

    const class1FinalData2 = {
      HcpRoleId : this.eventInitiation4.value.hcpRole,
      MISCode : this.eventInitiation4.value.misCode,
      SpeakerCode : this.speakerCode,
      TrainerCode : "null",
      HonarariumRequired : this.eventInitiation6.value.isHonararium,
      Speciality : this.speciality,
      Tier : this.tier,
      'Go/NGo' : this.goNonGo,
      PresentationDuration : this.eventInitiation5.value.presentationDuration+"",
      PanelSessionPresentationDuration : this.eventInitiation5.value.panelSessionPreparation+"",
      PanelDiscussionDuration : this.eventInitiation5.value.panelDiscussionDuration+"",
      QASessionDuration : this.eventInitiation5.value.qaSession+"",
      BriefingSession : this.eventInitiation5.value.briefingDuration+"",
      TotalSessiionHours : this.totalHours+"",
      Rationale :this.eventInitiation6.value.rationale

    }
    console.log(class1FinalData2)
  }


  @HostListener('window:resize',['$event'])
    onResize(event:Event){
      this.isMobileMenu();
    }
  isMobileMenu() {
    
    if ($(window).width() <= 598) {
        // return false;
        console.log("yes")
        this.orientation ="vertical"
        // return 'vertical'
    }
    else{
      console.log("No")
      this.orientation = "horizontal"
      // return 'horizontal'
    }
};

  // File Upload Check
  selectedFile : File | null;
  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append('File 1', this.selectedFile);
    console.log(formData.get('File 1'))
   
  }



  stepControl1 = new FormGroup({
    step1 : new FormControl('',Step1Validator)
  })
  



}




function endTimeValidator(control : AbstractControl): ValidationErrors | null{
  
  console.log(Class1EventRequestComponent.startTime)
  if(Class1EventRequestComponent.startTime < control.value){
    // console.log("Yes")
    return null;
  }
  else{
    return {customError : true}
  }
 
}

function MISValidator(control : AbstractControl): ValidationErrors | null{
  console.log(control.value)
  if(control.value && control.value.startsWith('MS')){
    // console.log("No")
    return null
  }
  else{
    // console.log("Yes")
    return {customError : true}
  }
}

function Step1Validator(control : AbstractControl): ValidationErrors | null{
  console.log(Class1EventRequestComponent.upload1)
  console.log(Class1EventRequestComponent.withIn30Days)
  if(Class1EventRequestComponent.withIn30Days){
    if(Class1EventRequestComponent.upload1){
      return null;
    }
    else{
      return {customError : true};
    }
  }
  else{
    return null;
  }
 
}