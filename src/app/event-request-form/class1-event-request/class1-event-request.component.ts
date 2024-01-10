import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormControlName, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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

  constructor(private utilityService : UtilityService) {
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
      uploadDeviation1 : new FormControl(''),
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
      hcpRoleWritten : new FormControl('',[Validators.required]),
      misCode : new FormControl('', MISValidator),
      // speakerName : new FormControl('',[Validators.required]),
      // speakerCode : new FormControl('',[Validators.required]),
      // speaciality : new FormControl('',[Validators.required]),
      // tier : new FormControl('',[Validators.required]),
      // goNonGo : new FormControl('',[Validators.required])
    })

    this.eventInitiation5 = new FormGroup({
      presentationDuration : new FormControl('',[Validators.required]),
      panelSessionPreparation : new FormControl('',[Validators.required]),
      qaSession : new FormControl('',[Validators.required]),
      briefingDuration : new FormControl('',[Validators.required]),
      totalHours : new FormControl('',[Validators.required])
    })

    this.eventInitiation6 = new FormGroup({
      isHonararium : new FormControl('No',[Validators.required]),
      uploadNOC : new FormControl('',),
      rationale : new FormControl('',),
      // currency : new FormControl('',[Validators.required]),
      // otherCurrency : new FormControl('',),
      // taxSelect : new FormControl({value : '',disabled : !this.isHonararium}),
      // benficiaryName : new FormControl('',[Validators.required]),
      bankAccountNumber : new FormControl('',[Validators.required]),
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
    this.event2FormPrepopulate();
    this.event3FormPrepopulate();
    
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
        brandName : this.eventInitiation3.value.brandName,
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



  // Event Initiation Form4 Control
  showHCPRoleNameTextBox : boolean = false;
  approvedSpeakers : any;
  filteredspeakers : any;

  speakerName: string = '';
  speakerCode : string = '';
  speciality : string = '';
  tier : string = '';
  goNonGo : string = '';

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
      BenificiaryName : this.benificiaryName,
      BankAccountNumber : this.bankAccountNumber,
      PanName : this.nameAsPan,
      PanCardNumber : this.panCardNumber,
      IfscCode : this.ifscCode,
      EmailId : this.emailId,
      Invitees : this.eventInitiation7.value.invitee,
      IsAdvanceRequired : 'yes',
      SelectionOfTaxes : this.taxSelect
    }
    console.log(class1FinalData1)
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