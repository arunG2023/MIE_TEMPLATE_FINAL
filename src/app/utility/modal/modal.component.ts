import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEmployeesComponent } from 'src/app/add-employees/add-employees.component';
import { UtilityService } from 'src/app/services/utility.service';


@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  updateForm : FormGroup;

  // Update Fields
  firstName : string;
  lastName : string;
  email : string;
  roleName : string;

  text : string = "closed";

  constructor(public dialogRef : MatDialogRef<AddEmployeesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private utilityService : UtilityService){
    
    // this.fName = data.name
    this.firstName = data.FirstName;
    this.lastName = data.LastName;
    this.email = data.Email;
    this.roleName = data.RoleName;

    console.log(data)

    this.updateForm = new FormGroup({
      firstName : new FormControl(this.firstName,[Validators.required]),
      lastName : new FormControl(this.lastName,[Validators.required]),
      email : new FormControl(this.email, [Validators.required, Validators.email]),
      roleName : new FormControl(this.roleName, [Validators.required])
    })
  }

  close(){
    this.dialogRef.close(this.text)
  }

  updatedData : any;

  submit(){
    if(this.updateForm.valid){
      // console.log(this.updateForm.value)
      this.data.FirstName = this.updateForm.value.firstName;
      this.data.LastName = this.updateForm.value.lastName;
      this.data.Email = this.updateForm.value.email;
      this.data.RoleName = this.updateForm.value.roleName;
      console.log(this.data)
      this.utilityService.updateEmployees(this.data).subscribe(
        res  =>{
          console.log(res);
        },
        err => {
          console.log("Update Emloyee Not working")
        }
      )

      this.dialogRef.close(this.updateForm.value)
    }

  }

  ngOnInit(): void {
  }

}
